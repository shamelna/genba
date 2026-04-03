import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import NewEntryModal from '../components/NewEntryModal';
import MyJourneyBaseline from '../components/MyJourneyBaseline';
import { useAuth } from '../contexts/AuthContext';
import { useUserTier } from '../contexts/UserTierContext';
import {
  getJournalEntries,
  saveJournalEntryWithReflection,
  markModuleCompleted,
} from '../services/firestoreService';
import { caseStudies, MODULE_LABELS } from '../data/caseStudies';

// ─── Case-study reflection modal (opened from case study → journal redirect) ──
function CaseStudyReflectionModal({ moduleId, onClose, onSaved }) {
  const { currentUser } = useAuth();
  const study = caseStudies[moduleId];
  const [title, setTitle] = useState(
    `My reflection — ${MODULE_LABELS[moduleId] || moduleId} Module`
  );
  const [freeEntry, setFreeEntry] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!freeEntry.trim()) return;
    setSaving(true);
    try {
      await saveJournalEntryWithReflection(currentUser.uid, moduleId, {
        title,
        freeEntry,
        journalPrompt: study?.journalPrompt || '',
      });
      await markModuleCompleted(currentUser.uid, moduleId);
      setSaved(true);
      setTimeout(() => navigate('/home'), 2200);
    } catch (err) {
      console.error('Error saving journal entry:', err);
      setSaving(false);
    }
  };

  if (saved) {
    return (
      <div className="fixed inset-0 z-50 bg-gi-deep flex flex-col items-center justify-center px-6 text-center">
        <div className="text-5xl mb-6">✓</div>
        <p className="text-gi-white text-xl font-light mb-2 tracking-wide">Reflection saved.</p>
        <p className="text-gi-horizon text-sm">Your journey is being written.</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-gi-deep flex flex-col">
      <div className="px-6 py-5 border-b border-gi-slate flex items-center justify-between flex-shrink-0">
        <button onClick={onClose} className="text-gi-horizon text-sm hover:text-gi-white transition-colors">
          ← Back
        </button>
        <span className="text-gi-horizon text-xs uppercase tracking-widest">New Entry</span>
        <div className="w-12" />
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full text-gi-white text-xl font-light bg-transparent border-none focus:outline-none focus:ring-0 mb-6 placeholder:text-gi-mist"
          placeholder="Entry title…"
        />
        {study?.journalPrompt && (
          <div
            className="rounded-gi p-4 mb-6"
            style={{ background: 'rgba(255,213,89,0.06)', border: '1px solid rgba(255,213,89,0.15)' }}
          >
            <p className="text-gi-gold text-xs uppercase tracking-widest mb-2">Prompt</p>
            <p className="text-gi-horizon text-sm leading-relaxed italic">{study.journalPrompt}</p>
          </div>
        )}
        <textarea
          value={freeEntry}
          onChange={e => setFreeEntry(e.target.value)}
          placeholder="Write freely. This belongs to you."
          rows={12}
          className="w-full resize-none text-gi-white text-sm leading-relaxed bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-gi-mist"
        />
      </div>
      <div className="px-6 pb-8 pt-4 border-t border-gi-slate flex-shrink-0">
        <button
          onClick={handleSave}
          disabled={saving || !freeEntry.trim()}
          className="w-full bg-gi-gold text-gi-deep font-semibold py-4 rounded-gi hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          {saving ? 'Saving…' : 'Save entry'}
        </button>
        <p className="text-gi-mist text-xs text-center mt-3">
          Once saved, entries are permanent and yours alone.
        </p>
      </div>
    </div>
  );
}

// ─── Entry card rendering ─────────────────────────────────────────────────────

function getEntryIcon(type) {
  switch (type) {
    case 'habit':                  return '✓';
    case 'bus':                    return '🚌';
    case 'ikigai':                 return '🧭';
    case 'intention':              return '🎯';
    case 'case-study-reflection':  return '📖';
    case 'genba-moment':           return '⬤';
    case 'stop-and-think':         return '◈';
    case 'baseline':               return '◎';
    default:                       return '📔';
  }
}

function getEntryAccent(type) {
  switch (type) {
    case 'genba-moment':   return '#FFD559';
    case 'stop-and-think': return '#4AB3A0';
    case 'baseline':       return '#A78BFA';
    case 'case-study-reflection': return '#60A5FA';
    default:               return null;
  }
}

function truncate(text, max = 110) {
  if (!text) return null;
  return text.length > max ? text.slice(0, max) + '…' : text;
}

function formatDate(val) {
  if (!val) return '';
  let d;
  if (val?.toDate) d = val.toDate();
  else if (typeof val === 'string') d = new Date(val);
  else d = new Date(val);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: d.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
  });
}

function EntryPreviewText({ entry }) {
  const text =
    entry.freeEntry ||
    entry.reflection ||
    entry.intention ||
    entry.response ||
    (entry.type === 'genba-moment' && entry.learned) ||
    (entry.type === 'stop-and-think' &&
      entry.promptAnswers?.find(p => p.answer)?.answer) ||
    null;

  if (text) {
    return (
      <p className="text-gi-horizon text-sm leading-relaxed italic">
        "{truncate(text)}"
      </p>
    );
  }

  if (entry.type === 'ikigai') {
    return <p className="text-gi-mist text-xs">Ikigai map updated</p>;
  }

  if (entry.type === 'baseline' && entry.scores) {
    const keys = Object.keys(entry.scores);
    const avg = keys.length
      ? Math.round(keys.reduce((s, k) => s + entry.scores[k], 0) / keys.length * 10) / 10
      : null;
    return (
      <p className="text-gi-horizon text-xs">
        Average score: <span style={{ color: '#A78BFA' }}>{avg}/10</span>
      </p>
    );
  }

  return null;
}

function EntryCard({ entry }) {
  const accent = getEntryAccent(entry.type);
  const dateVal = entry.date || entry.createdAt || entry._sortKey;

  return (
    <div
      className="rounded-gi p-4 mb-3"
      style={{
        background: '#253545',
        border: `1px solid ${accent ? `${accent}22` : 'rgba(46,65,86,0.6)'}`,
        borderLeft: accent ? `3px solid ${accent}` : undefined,
      }}
    >
      <div className="flex items-start gap-3">
        <span
          className="text-base flex-shrink-0 mt-0.5"
          style={{ color: accent || '#8BA0B2' }}
        >
          {getEntryIcon(entry.type)}
        </span>
        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <p className="text-gi-white text-sm font-medium leading-snug truncate">
              {entry.title ||
                entry.displayName ||
                entry.label ||
                typeLabel(entry.type)}
            </p>
            {entry.score && (
              <span
                className="text-xs flex-shrink-0 px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(255,213,89,0.12)', color: '#FFD559' }}
              >
                {entry.score}/5
              </span>
            )}
          </div>

          {/* Meta */}
          <div className="flex items-center gap-2 mb-2">
            <p className="text-gi-mist text-xs">{formatDate(dateVal)}</p>
            {entry.type === 'case-study-reflection' && entry.moduleId && (
              <>
                <span className="text-gi-slate text-xs">·</span>
                <span className="text-xs" style={{ color: '#60A5FA' }}>
                  {MODULE_LABELS[entry.moduleId] || entry.moduleId}
                </span>
              </>
            )}
            {entry.type === 'stop-and-think' && entry.moduleLabel && (
              <>
                <span className="text-gi-slate text-xs">·</span>
                <span className="text-xs" style={{ color: '#4AB3A0' }}>{entry.moduleLabel}</span>
              </>
            )}
            {entry.type === 'genba-moment' && entry.ikigaiZones?.length > 0 && (
              <>
                <span className="text-gi-slate text-xs">·</span>
                <span className="text-xs text-gi-mist">{entry.ikigaiZones.length} zone{entry.ikigaiZones.length > 1 ? 's' : ''}</span>
              </>
            )}
          </div>

          <EntryPreviewText entry={entry} />

          {/* Habit / bus meta */}
          {entry.habitName && (
            <p className="text-gi-mist text-xs mt-1">Habit: {entry.habitName}</p>
          )}
          {entry.busColour && (
            <p className="text-gi-mist text-xs mt-1">
              Bus: {entry.busColour.charAt(0).toUpperCase() + entry.busColour.slice(1)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function typeLabel(type) {
  switch (type) {
    case 'genba-moment':          return 'Genba Ikigai Moment';
    case 'stop-and-think':        return 'Stop and Think';
    case 'baseline':              return 'Baseline Snapshot';
    case 'case-study-reflection': return 'Case Study Reflection';
    case 'intention':             return 'Weekly Intention';
    case 'ikigai':                return 'Ikigai Map';
    case 'habit':                 return 'Habit Check-in';
    case 'bus':                   return 'Bus Check-in';
    default:                      return 'Journal Entry';
  }
}

// ─── Filter chips ─────────────────────────────────────────────────────────────
const ALL_FILTERS = [
  { key: 'all',                   label: 'All' },
  { key: 'genba-moment',          label: 'Moments' },
  { key: 'stop-and-think',        label: 'Reflections' },
  { key: 'case-study-reflection', label: 'Case Study' },
  { key: 'habit',                 label: 'Habits' },
  { key: 'intention',             label: 'Intentions' },
  { key: 'bus',                   label: 'Bus',    premium: true },
  { key: 'ikigai',                label: 'Ikigai', premium: true },
];

// ─── Main Journal Page ────────────────────────────────────────────────────────
export default function Journal() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useAuth();
  const { canAccessCompass } = useUserTier();

  // Tab: 'entries' | 'journey'
  const [activeTab, setActiveTab] = useState('entries');
  const [activeFilter, setActiveFilter] = useState('all');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showCaseStudyModal, setShowCaseStudyModal] = useState(false);
  const [pendingModuleId, setPendingModuleId] = useState(null);
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [newEntryInitialType, setNewEntryInitialType] = useState(null);
  const [newEntryInitialModule, setNewEntryInitialModule] = useState(null);

  // Handle URL params from case study redirect or workbook deep-link
  useEffect(() => {
    const newEntry = searchParams.get('newEntry');
    const module   = searchParams.get('module');
    const entryType = searchParams.get('type');
    const tab       = searchParams.get('tab');

    if (tab === 'journey') {
      setActiveTab('journey');
    }

    if (newEntry === 'true') {
      if (module && !entryType) {
        // Legacy case-study redirect
        setPendingModuleId(module);
        setShowCaseStudyModal(true);
      } else {
        // New entry modal with optional pre-selected type / module
        if (entryType) setNewEntryInitialType(entryType);
        if (module)    setNewEntryInitialModule(module);
        setShowNewEntryModal(true);
      }
      setSearchParams({});
    }
  }, []);

  const loadEntries = useCallback(async () => {
    setLoading(true);
    try {
      const uid = currentUser?.uid;
      if (!uid) return;
      const allEntries = await getJournalEntries(uid);
      const filtered = activeFilter === 'all'
        ? allEntries
        : allEntries.filter(e => e.type === activeFilter);
      setEntries(filtered);
    } catch (err) {
      console.error('Error loading journal entries:', err);
    } finally {
      setLoading(false);
    }
  }, [currentUser, activeFilter]);

  useEffect(() => {
    if (activeTab === 'entries') loadEntries();
  }, [activeTab, loadEntries]);

  const visibleFilters = ALL_FILTERS.filter(f => !f.premium || canAccessCompass);

  // ── Counts for summary ─────────────────────────────────────────────────────
  const countOf = (type) => entries.filter(e => e.type === type).length;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Case-study reflection modal (legacy redirect from CaseStudyPage) */}
      {showCaseStudyModal && pendingModuleId && (
        <CaseStudyReflectionModal
          moduleId={pendingModuleId}
          onClose={() => setShowCaseStudyModal(false)}
          onSaved={() => { setShowCaseStudyModal(false); loadEntries(); }}
        />
      )}

      {/* New workbook entry modal */}
      {showNewEntryModal && (
        <NewEntryModal
          initialType={newEntryInitialType}
          initialModule={newEntryInitialModule}
          onClose={() => {
            setShowNewEntryModal(false);
            setNewEntryInitialType(null);
            setNewEntryInitialModule(null);
            if (activeTab === 'entries') loadEntries();
          }}
        />
      )}

      <div className="min-h-screen bg-gi-deep pt-16 pb-6">

        {/* ── Page header ────────────────────────────────────────────────────── */}
        <div
          className="px-5 pt-6 pb-5"
          style={{ borderBottom: '1px solid rgba(46,65,86,0.5)' }}
        >
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-gi-mist text-xs uppercase tracking-widest mb-1">Your</p>
              <h1 className="text-2xl font-light text-gi-white tracking-wide">Journal</h1>
            </div>
            <button
              onClick={() => {
                setNewEntryInitialType(null);
                setNewEntryInitialModule(null);
                setShowNewEntryModal(true);
              }}
              className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-gi transition-all hover:opacity-90"
              style={{ background: '#FFD559', color: '#0e1c28' }}
            >
              <span className="text-base leading-none">+</span>
              New Entry
            </button>
          </div>

          {/* Tab bar */}
          <div className="flex gap-0">
            {[
              { id: 'entries', label: 'Entries' },
              { id: 'journey', label: 'My Journey' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 py-2.5 text-sm font-medium transition-all relative"
                style={{
                  color: activeTab === tab.id ? '#FFD559' : '#8BA0B2',
                  borderBottom: activeTab === tab.id
                    ? '2px solid #FFD559'
                    : '2px solid rgba(74,100,120,0.3)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Entries tab ─────────────────────────────────────────────────────── */}
        {activeTab === 'entries' && (
          <div className="px-4 pt-5">

            {/* Filter chips */}
            <div className="flex gap-2 mb-5 overflow-x-auto pb-1 -mx-1 px-1">
              {visibleFilters.map(f => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full transition-all font-medium"
                  style={{
                    background: activeFilter === f.key ? '#FFD559' : 'rgba(37,53,69,0.8)',
                    color: activeFilter === f.key ? '#0e1c28' : '#8BA0B2',
                    border: activeFilter === f.key
                      ? '1px solid transparent'
                      : '1px solid rgba(74,100,120,0.4)',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Entry list */}
            {loading ? (
              <div className="py-12 text-center text-gi-horizon text-sm">
                Loading your entries…
              </div>
            ) : entries.length > 0 ? (
              <>
                {entries.map((entry, i) => (
                  <EntryCard key={`${entry.type}-${entry.id || i}`} entry={entry} />
                ))}

                {/* Summary strip */}
                {activeFilter === 'all' && (
                  <div
                    className="rounded-gi p-4 mt-4 grid grid-cols-3 gap-3 text-center"
                    style={{ background: 'rgba(37,53,69,0.6)', border: '1px solid rgba(46,65,86,0.5)' }}
                  >
                    {[
                      { label: 'Moments', count: countOf('genba-moment'), color: '#FFD559' },
                      { label: 'Reflections', count: countOf('stop-and-think') + countOf('case-study-reflection'), color: '#4AB3A0' },
                      { label: 'Check-ins', count: countOf('habit') + countOf('bus'), color: '#60A5FA' },
                    ].map(s => (
                      <div key={s.label}>
                        <p className="text-xl font-light" style={{ color: s.color }}>{s.count}</p>
                        <p className="text-gi-mist text-xs mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center text-center py-12 px-4">
                <div className="text-4xl mb-4">📔</div>
                <p className="text-gi-white font-medium mb-2">
                  {activeFilter === 'all' ? 'No entries yet' : `No ${activeFilter} entries`}
                </p>
                <p className="text-gi-horizon text-sm leading-relaxed mb-6 max-w-xs">
                  {activeFilter === 'all'
                    ? 'Tap "New Entry" to capture a leadership moment, a reflection, or a baseline.'
                    : `You haven't recorded any ${typeLabel(activeFilter).toLowerCase()} entries yet.`}
                </p>
                <button
                  onClick={() => {
                    setNewEntryInitialType(activeFilter !== 'all' ? activeFilter : null);
                    setShowNewEntryModal(true);
                  }}
                  className="border border-gi-gold/40 text-gi-gold px-6 py-2 rounded-gi hover:bg-gi-gold/10 transition-colors text-sm"
                >
                  + New Entry
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── My Journey tab ──────────────────────────────────────────────────── */}
        {activeTab === 'journey' && (
          <div className="px-4 pt-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-gi-white text-sm font-medium">Leadership Baseline</p>
                <p className="text-gi-mist text-xs mt-0.5">Track how you've grown over time</p>
              </div>
              <button
                onClick={() => {
                  setNewEntryInitialType('baseline');
                  setNewEntryInitialModule(null);
                  setShowNewEntryModal(true);
                }}
                className="text-xs px-3 py-1.5 rounded-gi transition-colors"
                style={{
                  border: '1px solid rgba(167,139,250,0.35)',
                  color: '#A78BFA',
                }}
              >
                + Snapshot
              </button>
            </div>
            <MyJourneyBaseline
              onNewBaseline={() => {
                setNewEntryInitialType('baseline');
                setNewEntryInitialModule(null);
                setShowNewEntryModal(true);
              }}
            />
          </div>
        )}

        <Navigation />
      </div>
    </>
  );
}
