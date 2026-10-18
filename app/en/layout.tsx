// The root layout serves <html lang="nl"> for every prerendered page; marking the /en subtree
// keeps the language in the server HTML. display: contents leaves page layouts untouched.
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en" style={{ display: "contents" }}>
      {children}
    </div>
  );
}
