import { useState } from "react";
import { Link } from "react-router-dom";
import { Database, GraduationCap, Info, Lock, Microscope, ShieldCheck, Trash2 } from "lucide-react";
import { api } from "../lib/api";
import { resetDeviceId } from "../lib/device";
import { resetProgress, useProgress } from "../lib/progress";
import { getTheme, setTheme, type ThemePref } from "../lib/theme";
import { useAsync } from "../lib/useAsync";
import { useToast } from "../components/Toast";
import { ConfirmDialog, Segmented } from "../components/ui";

const DATA_SOURCES = [
  { name: "PubChem (NIH / NCBI)", use: "Chemical identity, properties, GHS hazards, FDA and CIR regulatory data, 2D images and 3D conformers", url: "https://pubchem.ncbi.nlm.nih.gov/" },
  { name: "PubMed E-utilities (NCBI)", use: "Publication counts for the research sort, and peer-reviewed abstracts behind every profile", url: "https://www.ncbi.nlm.nih.gov/books/NBK25501/" },
  { name: "USDA FoodData Central", use: "How many branded U.S. foods list an ingredient", url: "https://fdc.nal.usda.gov/" },
  { name: "Open Food, Beauty & Products Facts (ODbL)", use: "Ingredient lists and product photos found by barcode", url: "https://world.openfoodfacts.org/" },
  { name: "Anthropic Claude (optional)", use: "When configured: richer extraction from abstracts and enhanced label reading. Assay works fully without it.", url: "https://www.anthropic.com/" },
];

const LIBRARIES = [
  ["React", "MIT", "User interface"],
  ["React Router", "MIT", "Navigation"],
  ["Vite", "MIT", "Build tooling"],
  ["Express", "MIT", "API server"],
  ["Tesseract.js", "Apache-2.0", "On-device OCR (WebAssembly)"],
  ["ZXing (@zxing/browser)", "Apache-2.0", "Barcode scanning fallback"],
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
  const [confirmProgress, setConfirmProgress] = useState(false);
  const progress = useProgress();
  const completed = Object.values(progress.lessons).filter((l) => l.completed).length;

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
          Ingredient labels are written for regulators, not people. Assay turns them into chemistry you can understand: what each molecule is, how it works, what the
          evidence says about its safety, and how it's made. Every claim links back to its source.
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
            <Microscope width={20} height={20} aria-hidden="true" style={{ color: "var(--primary)", marginTop: 2 }} />
            <div>
              <div style={{ fontWeight: 600 }}>Automatic research</div>
              <div className="subtle small">
                {config.data
                  ? config.data.ai
                    ? `On · PubChem and PubMed, with extraction by ${config.data.model}`
                    : "On · PubChem and PubMed, summarized directly from the source text"
                  : "Checking…"}
              </div>
            </div>
          </div>
        </div>
        <hr className="divider" />
        <div className="row-wrap between">
          <div className="row" style={{ alignItems: "flex-start" }}>
            <GraduationCap width={20} height={20} aria-hidden="true" style={{ color: "var(--primary)", marginTop: 2 }} />
            <div>
              <div style={{ fontWeight: 600 }}>Learning progress</div>
              <div className="subtle small">
                {completed} lessons, {progress.discovered.length} molecules and {progress.myths.answered} Myth or Fact answers, saved on this device.
              </div>
            </div>
          </div>
          <button className="btn" onClick={() => setConfirmProgress(true)} disabled={!completed && !progress.discovered.length && !progress.myths.answered}>
            Reset progress
          </button>
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
          How Assay works
        </h2>
        <dl className="method-list">
          <div>
            <dt>Ingredient health scores</dt>
            <dd>
              Each ingredient gets a 0–100 score for typical consumer use, based on regulatory evaluations (FDA, EFSA, CIR, ECHA), toxicology and the weight of published
              evidence. The score reflects the dose you'd actually encounter, not a lab worst case.
            </dd>
          </div>
          <div>
            <dt>Product ratings</dt>
            <dd>
              Ingredients are weighted by label position, since labels list them by amount. Ingredients of concern still count when they appear late in the list,
              certified-organic ingredients earn a small bonus, and long lists of synthetic additives cost a little.
            </dd>
          </div>
          <div>
            <dt>Organic vs. artificial</dt>
            <dd>
              Ingredients labeled organic, or of natural or mineral origin, are grouped separately. Synthetic, fermented and chemically modified ingredients can be sorted
              by most or least healthy and by most or least researched (PubMed publication count).
            </dd>
          </div>
          <div>
            <dt>Automatic research</dt>
            <dd>
              No one has to approve a profile before you can read it. <strong>Curated</strong> profiles ship with the app, written with sources. A new ingredient gets an
              instant <strong>preliminary</strong> profile from chemistry rules and PubChem, then Assay searches PubMed in the background and publishes an{" "}
              <strong>auto-researched</strong> profile with citations. If something looks wrong, the report button on any profile triggers a fresh research pass.
            </dd>
          </div>
          <div>
            <dt>Evidence levels</dt>
            <dd>
              Every mechanism is tagged by how strong its evidence is: well established, human studies, lab and animal studies, or emerging. Learning to tell these apart
              is part of the point.
            </dd>
          </div>
        </dl>
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
          <li>Barcode lookups send only the barcode number to the open product databases.</li>
          <li>Lesson progress, quiz scores and your molecule collection never leave this device.</li>
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
          condition or are pregnant, talk to a health professional. Curious about the chemistry? Start with the <Link to="/learn">lessons</Link>.
        </div>
      </div>

      <p className="subtle" style={{ fontSize: "var(--text-xs)", textAlign: "center" }}>
        Assay v2.0
      </p>

      <ConfirmDialog
        open={confirm}
        title="Delete all your data?"
        body="This permanently removes your scan history from the server. Ingredient profiles and your learning progress aren't affected."
        confirmLabel="Delete everything"
        danger
        onConfirm={deleteData}
        onClose={() => setConfirm(false)}
      />
      <ConfirmDialog
        open={confirmProgress}
        title="Reset learning progress?"
        body="Completed lessons, quiz scores, your molecule collection and Myth or Fact streaks on this device will be cleared."
        confirmLabel="Reset progress"
        danger
        onConfirm={() => {
          resetProgress();
          toast("Learning progress reset.", "info");
        }}
        onClose={() => setConfirmProgress(false)}
      />
    </div>
  );
}
