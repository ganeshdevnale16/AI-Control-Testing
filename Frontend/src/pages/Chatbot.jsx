import { useCallback, useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import MessageList from "../components/MessageList";
import InputArea from "../components/InputArea";
import { fetchInputFileName } from "../utils/api";
import { downloadControlTestingReport } from "../utils/exportExcel";
import { PROCESSING_BAR_MS } from "../components/ProcessingBar";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      type: "welcome",
      content: null, // rendered specially by WelcomeContent
    },
  ]);
  const [input, setInput] = useState("");
  const [stagedFiles, setStagedFiles] = useState([]);
  const [flowStep, setFlowStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  // "idle" | "fetching" | "done"
  const [importState, setImportState] = useState("idle");
  // filename returned from the backend
  const [fetchedFileName, setFetchedFileName] = useState(null);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, stagedFiles, importState, fetchedFileName]);

  // ── "Import Input File" button handler ──────────────────────────────────
  const handleImportClick = async () => {
    if (importState !== "idle" || processing) return;

    // 1. Show spinner on the button
    setImportState("fetching");

    try {
      // 2. Hit the backend
      const fileName = await fetchInputFileName();

      // 3. Show filename in a user-style bubble and advance the flow
      setFetchedFileName(fileName);
      setImportState("done");

      const fileMsgId = Date.now();
      const progressMsgId = Date.now() + 1;

      setMessages((prev) => [
        ...prev,
        // user bubble - looks like they "sent" the file
        { id: fileMsgId, role: "user", type: "file", content: fileName },
        // progress bar bubble
        {
          id: progressMsgId,
          role: "assistant",
          type: "progress",
          content: "Processing input file",
        },
      ]);

      // 4. Once the progress bar completes, replace it with the control summary
      setTimeout(() => {
        setMessages((prev) => {
          const filtered = prev.filter((m) => m.id !== progressMsgId);
          return [
            ...filtered,
            { id: Date.now() + 2, role: "assistant", type: "summary" },
          ];
        });

        // 5. Then the 9 control attributes captured from the same input file
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { id: Date.now() + 3, role: "assistant", type: "attributes" },
          ]);

          // 6. Finally, ask for the supporting evidence
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now() + 4,
                role: "assistant",
                type: "jsx",
                content: (
                  <>
                    Please upload the supporting evidence documents for
                    validation and control testing.
                    <br />
                    <br />
                    <strong>You can attach the files</strong> using the paperclip
                    button.
                  </>
                ),
              },
            ]);
            setFlowStep(2);
            setProcessing(false);
          }, 1000);
        }, 900);
      }, PROCESSING_BAR_MS + 400);
    } catch (err) {
      // Reset so the user can retry
      setImportState("idle");
      console.error("Failed to fetch input file name:", err);
    }
  };

  // ── File attachment (evidence upload) ───────────────────────────────────
  const handleFileChange = (e) => {
    const picked = Array.from(e.target.files);
    if (!picked.length || processing) return;
    e.target.value = "";
    setStagedFiles((prev) => [...prev, ...picked]);
  };

  const removeStagedFile = (index) =>
    setStagedFiles((prev) => prev.filter((_, i) => i !== index));

  // ── Validation finished (fired by the checklist message) ────────────────
  const handleChecksComplete = useCallback(() => {
    setMessages((prev) =>
      prev.some((m) => m.type === "table")
        ? prev
        : [...prev, { id: Date.now(), role: "assistant", type: "table" }]
    );
    setFlowStep(3);
    setProcessing(false);
  }, []);

  // ── Send ────────────────────────────────────────────────────────────────
  // flowStep 1 = awaiting input file import
  // flowStep 2 = awaiting supporting evidence files
  // flowStep 3 = results shown
  const handleSend = () => {
    if (processing) return;
    const hasFiles = stagedFiles.length > 0;
    const hasText = input.trim().length > 0;
    if (!hasFiles && !hasText) return;

    const newMsgs = [];
    const spinnerId = Date.now() + 999;

    if (hasFiles)
      stagedFiles.forEach((f) =>
        newMsgs.push({
          id: Date.now() + Math.random(),
          role: "user",
          type: "file",
          content: f.name,
        })
      );
    if (hasText)
      newMsgs.push({
        id: Date.now() + Math.random(),
        role: "user",
        type: "text",
        content: input,
      });

    // ── Step 2: supporting evidence ───────────────────────────────────────
    // The checklist message stays in the transcript; it calls back when the
    // run finishes (which the user can pause), and the table is appended then.
    if (flowStep === 2 && hasFiles) {
      newMsgs.push({
        id: spinnerId,
        role: "assistant",
        type: "checks",
      });

      setMessages((prev) => [...prev, ...newMsgs]);
      setInput("");
      setStagedFiles([]);
      setProcessing(true);
      return;
    }

    // ── Anything else - nudge the user toward the expected input ──────────
    setMessages((prev) => [...prev, ...newMsgs]);
    setInput("");
    setStagedFiles([]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          type: "jsx",
          content:
            flowStep === 1 ? (
              <>Please import the input file first to begin the assessment.</>
            ) : (
              <>
                Please upload the required evidence file to proceed with the
                assessment.
              </>
            ),
        },
      ]);
    }, 600);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#f0f2f5",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <style>{`
       @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
       @keyframes fadeUp { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
       .msg-in { animation: fadeUp 0.2s ease; }
     `}</style>

      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          minWidth: 0,
        }}
      >
        <MessageList
          ref={messagesEndRef}
          messages={messages}
          importState={importState}
          fetchedFileName={fetchedFileName}
          onImportClick={handleImportClick}
          onDownload={downloadControlTestingReport}
          onChecksComplete={handleChecksComplete}
        />

        <InputArea
          input={input}
          setInput={setInput}
          stagedFiles={stagedFiles}
          onFileChange={handleFileChange}
          onRemoveStagedFile={removeStagedFile}
          onSend={handleSend}
          processing={processing}
          fileInputRef={fileInputRef}
        />
      </div>
    </div>
  );
}
