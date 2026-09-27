import { useState } from "react";
import { Link } from "react-router-dom";
import { Database, Info, Lock, ShieldCheck, Trash2, WandSparkles } from "lucide-react";
import { api } from "../lib/api";
import { resetDeviceId } from "../lib/device";
import { getTheme, setTheme, type ThemePref } from "../lib/theme";
import { useAsync } from "../lib/useAsync";
import { useToast } from "../components/Toast";
import { ConfirmDialog, Segmented } from "../components/ui";

const DATA_SOURCES = [
  { name: "PubChem (NIH / NCBI)", use: "Chemical identity, properties, GHS hazards, FDA and CIR regulatory data, 2D images and 3D conformers", url: "https://pubchem.ncbi.nlm.nih.gov/" },
  { name: "PubMed E-utilities (NCBI)", use: "Publication counts for the research sort, and peer-reviewed abstracts behind every profile", url: "https://www.ncbi.nlm.nih.gov/books/NBK25501/" },
  { name: "USDA FoodData Central", use: "How many branded U.S. foods list an ingredient", url: "https://fdc.nal.usda.gov/" },
  { name: "Anthropic Claude (optional)", use: "Basic AI Drafts, grounded extraction from abstracts, and enhanced label reading", url: "https://www.anthropic.com/" },
];

const LIBRARIES = [
  ["React", "MIT", "User interface"],
  ["React Router", "MIT", "Navigation"],
  ["Vite", "MIT", "Build tooling"],
  ["Express", "MIT", "API server"],
  ["Tesseract.js", "Apache-2.0", "On-device OCR (WebAssembly)"],
  ["3Dmol.js", "BSD-3-Clause", "Interactive WebGL molecule viewer"],
  ["Zod", "MIT", "Input and AI output validation"],
  ["Anthropic TypeScript SDK", "MIT", "Claude API client"],
  ["Lucide", "ISC", "Icons"],
  ["Fontsource (Newsreader, IBM Plex)", "OFL-1.1", "Self-hosted typefaces"],
  ["Node.js node:sqlite", "MIT", "Embedded database"],
];

export function AboutPage() {
  const toast = useToast();
  const config = useAsync(() => api.config(), []);
  const [theme, setThemeState] = useState<ThemePref>(getTheme());
  const [confirm, setConfirm] = useState(false);

  const deleteData = async () => {
    try {
      const { deleted } = await api.deleteMyData();
      resetDeviceId();
      toast(`Deleted ${deleted} scan${deleted === 1 ? "" : "s"} and reset this device's ID.`, "success");
    } catch (err) {
      toast((err as Error).message, "error");
    }
  };

  return (
    <div className="stack-lg fade-up">
      <div className="page-head" style={{ marginBottom: 0 }}>
        <h1 className="page-title">About Assay</h1>
        <p className="lede">
          Ingredient labels are written for regulators, not people. Assay translates them into plain language, rates products on the evidence, and shows its sources so
          you can check the science yourself, whether an ingredient is harmless or worth avoiding.
        </p>
      </div>

      <section className="card card-pad stack" aria-labelledby="settings-title">
        <h2 id="settings-title" className="section-title">
          Settings
        </h2>
        <div className="row-wrap between">
          <div>
            <div style={{ fontWeight: 600 }}>Appearance</div>
            <div className="subtle" style={{ fontSize: "var(--text-sm)" }}>
              Match your device, or choose a theme.
            </div>
          </div>
          <Segmented
            label="Theme"
            value={theme}
            onChange={(t) => {
              setTheme(t);
              setThemeState(t);
            }}
            options={[
              { value: "system", label: "System" },
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          />
        </div>
        <hr className="divider" />
        <div className="row-wrap between">
          <div className="row" style={{ alignItems: "flex-start" }}>
            <WandSparkles width={20} height={20} aria-hidden="true" style={{ color: "var(--draft)", marginTop: 2 }} />
            <div>
              <div style={{ fontWeight: 600 }}>AI pipeline</div>
              <div className="subtle" style={{ fontSize: "var(--text-sm)" }}>
                {config.data
                  ? config.data.ai
                    ? `On · drafts and extraction use ${config.data.model}`
                    : "Off · drafts use an extractive summarizer over PubChem and PubMed text"
                  : "Checking…"}
              </div>
            </div>
          </div>
        </div>
        <hr className="divider" />
        <div className="row-wrap between">
          <div>
            <div style={{ fontWeight: 600 }}>Delete my data</div>
            <div className="subtle" style={{ fontSize: "var(--text-sm)" }}>
              Erase your scan history from our server and reset this device's anonymous ID.
            </div>
          </div>
          <button className="btn btn-danger" onClick={() => setConfirm(true)}>
            <Trash2 aria-hidden="true" /> Delete my data
          </button>
        </div>
      </section>

      <section className="stack" aria-labelledby="method-title">
        <h2 id="method-title" className="section-title">
          How ratings work
        </h2>
        <div className="pf-grid two">
          <div className="item-card">
            <h3>Ingredient health scores</h3>
            <p>
              Each ingredient gets a 0–100 score for typical consumer use, based on regulatory evaluations (FDA, EFSA, CIR, ECHA), toxicology and the weight of
              published evidence. The score reflects the dose you'd actually encounter, not a lab worst case.
            </p>
          </div>
          <div className="item-card">
            <h3>Product ratings</h3>
            <p>
              Ingredients are weighted by label position, since labels list them by amount. Ingredients of concern still count when they appear late in the list,
              certified-organic ingredients earn a small bonus, and long lists of synthetic additives cost a little.
            </p>
          </div>
          <div className="item-card">
            <h3>Organic vs. artificial</h3>
            <p>
              Ingredients labeled organic, or of natural or mineral origin, are grouped separately. Synthetic, fermented and chemically modified ingredients can be
              sorted by most or least healthy and by most or least researched (PubMed publication count).
            </p>
          </div>
          <div className="item-card">
            <h3>Verification</h3>
            <p>
              New ingredients get an instant “Basic AI Draft” that only the scanning user sees. After a background literature search, a reviewer fact-checks the draft
              against its sources, confirms the 3D structure and approves it for everyone.
            </p>
          </div>
        </div>
      </section>

      <section className="card card-pad stack" aria-labelledby="privacy-title">
        <div className="row">
          <Lock width={20} height={20} aria-hidden="true" style={{ color: "var(--primary)" }} />
          <h2 id="privacy-title" className="section-title">
            Privacy
          </h2>
        </div>
        <ul className="prose small" style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 6 }}>
          <li>No accounts, names or emails. Your history is tied to a random ID stored on this device.</li>
          <li>Label photos are read on your device with Tesseract. Images are only uploaded if you turn on enhanced AI reading, and they aren't stored.</li>
          <li>We store the ingredient text you analyze so your history and shared links work. You can delete it at any time above.</li>
          <li>No ads, trackers or third-party analytics.</li>
        </ul>
      </section>

      <section className="stack" aria-labelledby="sources-title">
        <div className="row">
          <Database width={20} height={20} aria-hidden="true" style={{ color: "var(--primary)" }} />
          <h2 id="sources-title" className="section-title">
            Data sources
          </h2>
        </div>
        <div className="card">
          <ul className="ing-list">
            {DATA_SOURCES.map((d) => (
              <li key={d.name}>
                <a className="ing-row" href={d.url} target="_blank" rel="noreferrer">
                  <div className="grow">
                    <div className="name">{d.name}</div>
                    <div className="meta">{d.use}</div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="stack" aria-labelledby="oss-title">
        <div className="row">
          <ShieldCheck width={20} height={20} aria-hidden="true" style={{ color: "var(--primary)" }} />
          <h2 id="oss-title" className="section-title">
            Open-source acknowledgments
          </h2>
        </div>
        <div className="card" style={{ overflowX: "auto" }}>
          <table className="reg-table">
            <thead>
              <tr>
                <th scope="col">Library</th>
                <th scope="col">License</th>
                <th scope="col">Used for</th>
              </tr>
            </thead>
            <tbody>
              {LIBRARIES.map(([name, license, use]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td className="mono" style={{ fontSize: "var(--text-sm)" }}>
                    {license}
                  </td>
                  <td className="muted">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="callout">
        <Info aria-hidden="true" />
        <div>
          <strong>Not medical advice.</strong> Assay is an educational tool. Ingredient scores describe typical consumer exposure; if you have allergies, a medical
          condition or are pregnant, talk to a health professional. <Link to="/admin">Reviewer sign-in</Link>
        </div>
      </div>

      <p className="subtle" style={{ fontSize: "var(--text-xs)", textAlign: "center" }}>
        Assay v1.0
      </p>

      <ConfirmDialog
        open={confirm}
        title="Delete all your data?"
        body="This permanently removes your scan history from the server. Verified ingredient profiles aren't affected."
        confirmLabel="Delete everything"
        danger
        onConfirm={deleteData}
        onClose={() => setConfirm(false)}
      />
    </div>
  );
}
