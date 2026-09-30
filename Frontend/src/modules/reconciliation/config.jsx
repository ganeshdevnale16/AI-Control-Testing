import { CONTROL_CONTEXT } from "./data/context";
import { CONTROL_ATTRIBUTES } from "./data/attributes";
import { POPULATION_CHECKS, EVIDENCE_CHECKS } from "./data/validationChecks";
import {
  POPULATION_COMPLETENESS,
  BREAK_LEVEL_TESTING,
  FULL_POPULATION_ANALYTICS,
} from "./data/populationTables";
import { SAMPLE_LEVEL_TESTING } from "./data/sampleTesting";

export const reconciliationModule = {
  id: "reconciliation",
  menu: {
    title: "AI Reconciliation Control Testing",
    tagline: "Custodian-to-internal-ledger position & cash reconciliation",
    badge: "Reconciliation",
    accent: "#0891b2",
  },
  welcome: {
    assistantName: "Reconciliation control testing assistant",
    intro: (
      <>
        I test Meridian Global Custody Services' daily cash and position
        reconciliation control the way an auditor would - checking
        timeliness, independent review, break logging, RCA quality and SLA
        closure against the evidence you give me, and rolling each finding up
        to a pass/exception verdict.
        <br />
        <br />
        Let's start with the basics. What is the <strong>control objective</strong>{" "}
        we're testing against?
      </>
    ),
  },
  // A linear, chat-driven flow: three questions captured as free text, the
  // control attributes (file or chat), then two file-upload steps that each
  // run a processing animation and land a set of output tables.
  flow: [
    {
      id: "objective",
      kind: "ask",
      field: "objective",
      progressLabel: "Control objective",
      question: "What is the control objective we're testing against?",
      expected: CONTROL_CONTEXT.objective,
    },
    {
      id: "risk",
      kind: "ask",
      field: "risk",
      progressLabel: "Control risk",
      question: "Now, what is the risk this control is meant to address?",
      expected: CONTROL_CONTEXT.risk,
    },
    {
      id: "description",
      kind: "ask",
      field: "description",
      progressLabel: "Control description",
      question:
        "And the control description - how is this control meant to operate day to day?",
      expected: CONTROL_CONTEXT.description,
    },
    {
      id: "attributes",
      kind: "ask-file-or-text",
      progressLabel: "Control attributes",
      question:
        "Now share the control attributes to test against - upload a file or paste them here, whichever's easier.",
      captured: CONTROL_ATTRIBUTES,
      capturedIntro:
        "Got it - here's what I've captured. A1-A3 test the recon level, A4-A7 test each break.",
    },
    {
      id: "population",
      kind: "file",
      progressLabel: "Population testing",
      question:
        "Next, please upload the population file(s) - the reconciliation inventory, the recon population, the recon-tool break output and the BMS extract - and I'll test completeness and accuracy end to end.",
      checks: POPULATION_CHECKS,
      runningLabel: "Testing population completeness and accuracy...",
      tables: [POPULATION_COMPLETENESS, BREAK_LEVEL_TESTING, FULL_POPULATION_ANALYTICS],
      exportTab: "IPE",
      tablesIntro:
        "Population testing is done - here's the completeness & accuracy check, the break-level findings, and the supplementary full-population analytics.",
    },
    {
      id: "sample",
      kind: "ask-file-or-text",
      progressLabel: "Selected sample",
      question:
        "Now, please upload your selected sample - the reconciliations you've chosen for testing. Files or the whole folder both work.",
      capturedIntro: "Got it, thanks - I've received your selected sample.",
      capturedNote:
        "I'm not running any processing on this upload - I'll test every break within your selection once you send over the supporting evidence in the next step.",
    },
    {
      id: "evidence",
      kind: "file",
      progressLabel: "Evidence testing",
      question:
        "Last step - upload the evidence for your selected sample: sign-off reports, counterparty statements, RCA documentation and escalation emails. Files or the whole folder both work - I'll test every attribute and roll up a verdict for each one.",
      checks: EVIDENCE_CHECKS,
      runningLabel: "Testing sample evidence against A1-A7...",
      tables: [SAMPLE_LEVEL_TESTING],
      exportTab: "Testing",
      tablesIntro:
        "Sample testing is done - here's the attribute-by-attribute result for all 25 selected reconciliations.",
      final: true,
    },
  ],
  messages: {
    wrongKindNudge_ask: "I just need your answer in the chat to move on.",
    wrongKindNudge_file: "I need a file upload for this step - attach it and send.",
    afterFlowNudge:
      "Testing is complete - download the report above, or start a new chat to run another test.",
  },
  excel: {
    fileName: "REC-01_Custody_Reconciliation_Control_Report.xlsx",
    ipeSheetName: "IPE",
    testingSheetName: "Testing",
    auditSheetName: "Audit Trail",
  },
  // Flat list of every procedure across all three processing steps, for the
  // shared Audit Trail sheet builder.
  validationChecks: [...POPULATION_CHECKS, ...EVIDENCE_CHECKS],
};
