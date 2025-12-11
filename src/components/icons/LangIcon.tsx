export const LangIcon = ({ text, color }: { text: string, color: string }) => (
  <div
    className="flex items-center justify-center font-bold font-sans select-none"
    style={{
      color: color,
      fontSize: "9px",
      width: "15px",
      height: "15px",
      border: `1.5px solid ${color}`,
      borderRadius: "3px",
      lineHeight: 1
    }}
  >
    {text}
  </div>
);
