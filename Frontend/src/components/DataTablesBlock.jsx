// // import { Download } from "lucide-react";

// // const BADGE_COLORS = {
// //   pass: { bg: "#dcfce7", fg: "#166534" },
// //   agrees: { bg: "#dcfce7", fg: "#166534" },
// //   exception: { bg: "#fee2e2", fg: "#991b1b" },
// //   difference: { bg: "#ffedd5", fg: "#9a3412" },
// //   "n/a": { bg: "#f1f5f9", fg: "#64748b" },
// // };

// // function Badge({ value }) {
// //   const colors = BADGE_COLORS[String(value).toLowerCase()] || {
// //     bg: "#f1f5f9",
// //     fg: "#334155",
// //   };
// //   return (
// //     <span
// //       style={{
// //         display: "inline-block",
// //         padding: "2px 9px",
// //         borderRadius: 99,
// //         background: colors.bg,
// //         color: colors.fg,
// //         fontSize: 11.5,
// //         fontWeight: 700,
// //         whiteSpace: "nowrap",
// //       }}
// //     >
// //       {value}
// //     </span>
// //   );
// // }

// // function formatCell(value, col) {
// //   if (value === null || value === undefined) return "";
// //   if (col.type === "number" && typeof value === "number") {
// //     return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
// //   }
// //   return value;
// // }

// // function DataTable({ table }) {
// //   const { title, note, columns, rows } = table;
// //   return (
// //     <div style={{ marginBottom: 18 }}>
// //       {title && (
// //         <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b", marginBottom: 2 }}>
// //           {title}
// //         </div>
// //       )}
// //       {note && (
// //         <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>{note}</div>
// //       )}
// //       <div
// //         style={{
// //           overflowX: "auto",
// //           border: "1px solid #e2e8f0",
// //           borderRadius: 8,
// //         }}
// //       >
// //         <table
// //           style={{
// //             width: "100%",
// //             borderCollapse: "collapse",
// //             fontSize: 12.5,
// //             minWidth: 600,
// //           }}
// //         >
// //           <thead>
// //             <tr style={{ background: "#f8fafc" }}>
// //               {columns.map((col) => (
// //                 <th
// //                   key={col.key}
// //                   style={{
// //                     padding: "9px 12px",
// //                     textAlign: col.align || "left",
// //                     color: "#64748b",
// //                     fontWeight: 600,
// //                     borderBottom: "1px solid #e2e8f0",
// //                     whiteSpace: "nowrap",
// //                     fontSize: 11.5,
// //                   }}
// //                 >
// //                   {col.label}
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {rows.map((row, i) => (
// //               <tr
// //                 key={i}
// //                 style={{
// //                   background: i % 2 === 0 ? "#ffffff" : "#fafbfc",
// //                   verticalAlign: "top",
// //                 }}
// //               >
// //                 {columns.map((col) => (
// //                   <td
// //                     key={col.key}
// //                     style={{
// //                       padding: "8px 12px",
// //                       textAlign: col.align || "left",
// //                       color: "#334155",
// //                       borderBottom: "1px solid #f1f5f9",
// //                       minWidth: col.minWidth,
// //                       whiteSpace: col.minWidth ? "normal" : "nowrap",
// //                       fontFamily: col.mono ? "monospace" : undefined,
// //                       fontSize: col.mono ? 12 : undefined,
// //                     }}
// //                   >
// //                     {col.type === "badge" ? (
// //                       <Badge value={row[col.key]} />
// //                     ) : (
// //                       formatCell(row[col.key], col)
// //                     )}
// //                   </td>
// //                 ))}
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function DataTablesBlock({ intro, tables, onDownload, downloadLabel }) {
// //   return (
// //     <div>
// //       {intro && (
// //         <p style={{ fontSize: 14, color: "#1e293b", marginTop: 0, marginBottom: 14 }}>
// //           {intro}
// //         </p>
// //       )}
// //       {tables.map((table, i) => (
// //         <DataTable key={table.title || i} table={table} />
// //       ))}
// //       {onDownload && (
// //         <button
// //           onClick={onDownload}
// //           style={{
// //             display: "inline-flex",
// //             alignItems: "center",
// //             gap: 8,
// //             background: "#1e293b",
// //             color: "#fff",
// //             border: "none",
// //             borderRadius: 8,
// //             padding: "9px 18px",
// //             fontSize: 13,
// //             fontWeight: 500,
// //             cursor: "pointer",
// //           }}
// //         >
// //           <Download size={14} /> {downloadLabel || "Download Excel Report"}
// //         </button>
// //       )}
// //     </div>
// //   );
// // }















// import { useState } from "react";
// import { ChevronDown, ChevronUp, Download } from "lucide-react";

// const BADGE_COLORS = {
//   pass: { bg: "#dcfce7", fg: "#166534" },
//   agrees: { bg: "#dcfce7", fg: "#166534" },
//   exception: { bg: "#fee2e2", fg: "#991b1b" },
//   difference: { bg: "#ffedd5", fg: "#9a3412" },
//   "n/a": { bg: "#f1f5f9", fg: "#64748b" },
// };

// function Badge({ value }) {
//   const colors = BADGE_COLORS[String(value).toLowerCase()] || {
//     bg: "#f1f5f9",
//     fg: "#334155",
//   };
//   return (
//     <span
//       style={{
//         display: "inline-block",
//         padding: "2px 9px",
//         borderRadius: 99,
//         background: colors.bg,
//         color: colors.fg,
//         fontSize: 11.5,
//         fontWeight: 700,
//         whiteSpace: "nowrap",
//       }}
//     >
//       {value}
//     </span>
//   );
// }

// function formatCell(value, col) {
//   if (value === null || value === undefined) return "";
//   if (col.type === "number" && typeof value === "number") {
//     return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
//   }
//   return value;
// }

// function DataTable({ table }) {
//   const { title, note, columns, rows } = table;
//   return (
//     <div style={{ marginBottom: 18 }}>
//       {title && (
//         <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b", marginBottom: 2 }}>
//           {title}
//         </div>
//       )}
//       {note && (
//         <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>{note}</div>
//       )}
//       <div
//         style={{
//           overflowX: "auto",
//           border: "1px solid #e2e8f0",
//           borderRadius: 8,
//         }}
//       >
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             fontSize: 12.5,
//             minWidth: 600,
//           }}
//         >
//           <thead>
//             <tr style={{ background: "#f8fafc" }}>
//               {columns.map((col) => (
//                 <th
//                   key={col.key}
//                   style={{
//                     padding: "9px 12px",
//                     textAlign: col.align || "left",
//                     color: "#64748b",
//                     fontWeight: 600,
//                     borderBottom: "1px solid #e2e8f0",
//                     whiteSpace: "nowrap",
//                     fontSize: 11.5,
//                   }}
//                 >
//                   {col.label}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row, i) => (
//               <tr
//                 key={i}
//                 style={{
//                   background: i % 2 === 0 ? "#ffffff" : "#fafbfc",
//                   verticalAlign: "top",
//                 }}
//               >
//                 {columns.map((col) => (
//                   <td
//                     key={col.key}
//                     style={{
//                       padding: "8px 12px",
//                       textAlign: col.align || "left",
//                       color: "#334155",
//                       borderBottom: "1px solid #f1f5f9",
//                       minWidth: col.minWidth,
//                       whiteSpace: col.minWidth ? "normal" : "nowrap",
//                       fontFamily: col.mono ? "monospace" : undefined,
//                       fontSize: col.mono ? 12 : undefined,
//                     }}
//                   >
//                     {col.type === "badge" ? (
//                       <Badge value={row[col.key]} />
//                     ) : (
//                       formatCell(row[col.key], col)
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// const buttonBase = {
//   display: "inline-flex",
//   alignItems: "center",
//   gap: 8,
//   borderRadius: 8,
//   padding: "9px 18px",
//   fontSize: 13,
//   fontWeight: 500,
//   cursor: "pointer",
// };

// function ExceptionSummaryPanel({ summary }) {
//   return (
//     <div
//       style={{
//         marginTop: 12,
//         border: "1px solid #fecaca",
//         background: "#fef2f2",
//         borderRadius: 10,
//         padding: "12px 16px",
//       }}
//     >
//       <div style={{ fontSize: 13.5, fontWeight: 700, color: "#991b1b", marginBottom: 6 }}>
//         {summary.title || "Exception Summary"}
//       </div>
//       <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#334155", lineHeight: 1.65 }}>
//         {summary.points.map((pt, i) => (
//           <li key={i} style={{ marginBottom: i === summary.points.length - 1 ? 0 : 6 }}>
//             {pt}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default function DataTablesBlock({ intro, tables, onDownload, downloadLabel, exceptionSummary }) {
//   const [showSummary, setShowSummary] = useState(false);
//   const hasSummary = !!exceptionSummary?.points?.length;

//   return (
//     <div>
//       {intro && (
//         <p style={{ fontSize: 14, color: "#1e293b", marginTop: 0, marginBottom: 14 }}>
//           {intro}
//         </p>
//       )}
//       {tables.map((table, i) => (
//         <DataTable key={table.title || i} table={table} />
//       ))}
//       {(onDownload || hasSummary) && (
//         <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//           {onDownload && (
//             <button
//               onClick={onDownload}
//               style={{ ...buttonBase, background: "#1e293b", color: "#fff", border: "none" }}
//             >
//               <Download size={14} /> {downloadLabel || "Download Excel Report"}
//             </button>
//           )}
//           {hasSummary && (
//             <button
//               onClick={() => setShowSummary((v) => !v)}
//               aria-expanded={showSummary}
//               style={{
//                 ...buttonBase,
//                 background: showSummary ? "#fef2f2" : "#ffffff",
//                 color: "#991b1b",
//                 border: "1px solid #fecaca",
//               }}
//             >
//               {exceptionSummary.title || "Exception Summary"}
//               {showSummary ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
//             </button>
//           )}
//         </div>
//       )}
//       {hasSummary && showSummary && <ExceptionSummaryPanel summary={exceptionSummary} />}
//     </div>
//   );
// }



import { useState } from "react";
import { ChevronDown, ChevronUp, Download } from "lucide-react";

const BADGE_COLORS = {
  pass: { bg: "#dcfce7", fg: "#166534" },
  agrees: { bg: "#dcfce7", fg: "#166534" },
  exception: { bg: "#fee2e2", fg: "#991b1b" },
  difference: { bg: "#ffedd5", fg: "#9a3412" },
  "n/a": { bg: "#f1f5f9", fg: "#64748b" },
};

function Badge({ value }) {
  const colors = BADGE_COLORS[String(value).toLowerCase()] || {
    bg: "#f1f5f9",
    fg: "#334155",
  };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 9px",
        borderRadius: 99,
        background: colors.bg,
        color: colors.fg,
        fontSize: 11.5,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </span>
  );
}

function formatCell(value, col) {
  if (value === null || value === undefined) return "";
  if (col.type === "number" && typeof value === "number") {
    return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }
  return value;
}

function DataTable({ table }) {
  const { title, note, columns, rows } = table;
  return (
    <div style={{ marginBottom: 18 }}>
      {title && (
        <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b", marginBottom: 2 }}>
          {title}
        </div>
      )}
      {note && (
        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>{note}</div>
      )}
      <div
        style={{
          overflowX: "auto",
          border: "1px solid #e2e8f0",
          borderRadius: 8,
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 12.5,
            minWidth: 600,
          }}
        >
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    padding: "9px 12px",
                    textAlign: col.align || "left",
                    color: "#64748b",
                    fontWeight: 600,
                    borderBottom: "1px solid #e2e8f0",
                    whiteSpace: "nowrap",
                    fontSize: 11.5,
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                style={{
                  background: i % 2 === 0 ? "#ffffff" : "#fafbfc",
                  verticalAlign: "top",
                }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={{
                      padding: "8px 12px",
                      textAlign: col.align || "left",
                      color: "#334155",
                      borderBottom: "1px solid #f1f5f9",
                      minWidth: col.minWidth,
                      whiteSpace: col.minWidth ? "normal" : "nowrap",
                      fontFamily: col.mono ? "monospace" : undefined,
                      fontSize: col.mono ? 12 : undefined,
                    }}
                  >
                    {col.type === "badge" ? (
                      <Badge value={row[col.key]} />
                    ) : (
                      formatCell(row[col.key], col)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const buttonBase = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  borderRadius: 8,
  padding: "9px 18px",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
};

function ExceptionSummaryPanel({ summary }) {
  return (
    <div
      style={{
        marginTop: 12,
        border: "1px solid #fecaca",
        background: "#fef2f2",
        borderRadius: 10,
        padding: "12px 16px",
      }}
    >
      <div style={{ fontSize: 13.5, fontWeight: 700, color: "#991b1b", marginBottom: 6 }}>
        {summary.title || "Exception Summary"}
      </div>
      {summary.intro && (
        <p style={{ margin: "0 0 8px", fontSize: 13, color: "#334155", lineHeight: 1.65 }}>
          {summary.intro}
        </p>
      )}
      {summary.leadIn && (
        <p style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 600, color: "#334155" }}>
          {summary.leadIn}
        </p>
      )}
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#334155", lineHeight: 1.65 }}>
        {summary.points.map((pt, i) => (
          <li key={i} style={{ marginBottom: i === summary.points.length - 1 ? 0 : 6 }}>
            {pt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DataTablesBlock({ intro, tables, onDownload, downloadLabel, exceptionSummary }) {
  const [showSummary, setShowSummary] = useState(false);
  const hasSummary = !!exceptionSummary?.points?.length;

  return (
    <div>
      {intro && (
        <p style={{ fontSize: 14, color: "#1e293b", marginTop: 0, marginBottom: 14 }}>
          {intro}
        </p>
      )}
      {tables.map((table, i) => (
        <DataTable key={table.title || i} table={table} />
      ))}
      {(onDownload || hasSummary) && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {onDownload && (
            <button
              onClick={onDownload}
              style={{ ...buttonBase, background: "#1e293b", color: "#fff", border: "none" }}
            >
              <Download size={14} /> {downloadLabel || "Download Excel Report"}
            </button>
          )}
          {hasSummary && (
            <button
              onClick={() => setShowSummary((v) => !v)}
              aria-expanded={showSummary}
              style={{
                ...buttonBase,
                background: showSummary ? "#fef2f2" : "#ffffff",
                color: "#991b1b",
                border: "1px solid #fecaca",
              }}
            >
              {exceptionSummary.title || "Exception Summary"}
              {showSummary ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>
      )}
      {hasSummary && showSummary && <ExceptionSummaryPanel summary={exceptionSummary} />}
    </div>
  );
}
