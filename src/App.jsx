import { useState } from 'react'
import './App.css'

// ============================================================================
// Sample Mock Data (Prepared for Future Spring Boot / AI Model Integration)
// ============================================================================
const INITIAL_NOTES = [
  {
    id: 'note-1',
    title: 'Binary Search Trees & AVL Rotations',
    subject: 'Computer Science',
    pages: 4,
    date: '2 hours ago',
    type: 'PDF',
    status: 'Summary Ready',
    excerpt: 'Detailed hand-drawn tree diagrams with LL, RR, LR, and RL balance factor rotation algorithms.',
    summary: {
      overview: 'Binary Search Trees maintain the invariant that left children are strictly less than parent nodes and right children are strictly greater. AVL Trees maintain balance factor in {-1, 0, 1}.',
      keyPoints: [
        'Search, Insertion, and Deletion are O(log n) average, O(n) worst case in unbalanced BSTs.',
        'AVL Trees strictly enforce balance using single (LL, RR) or double (LR, RL) rotations.',
        'Height of an AVL tree with n nodes is bounded by ~1.44 log2(n).',
        'In-order traversal always produces elements in strictly ascending sorted order.'
      ],
      formulas: [
        'Balance Factor = height(Left Subtree) - height(Right Subtree)',
        'AVL Tree Height: h < 1.4404 · log2(N + 2) - 0.328'
      ]
    },
    quiz: [
      {
        question: 'What is the balance factor condition for an AVL tree?',
        options: [
          'Balance factor must always equal 0',
          'Balance factor must be in {-1, 0, +1}',
          'Balance factor must be non-negative',
          'Balance factor must be less than 2'
        ],
        correct: 1,
        explanation: 'AVL trees strictly enforce that for every node, the difference between left and right subtree heights is at most 1, meaning {-1, 0, +1}.'
      },
      {
        question: 'What is the time complexity of searching a node in a balanced AVL tree?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correct: 1,
        explanation: 'Due to strictly maintained height balancing, lookup operations always run in logarithmic time O(log n).'
      }
    ]
  },
  {
    id: 'note-2',
    title: 'Thermodynamics: Second Law & Carnot Engine',
    subject: 'Physics',
    pages: 6,
    date: 'Yesterday',
    type: 'Image (PNG)',
    status: 'Quiz Generated',
    excerpt: 'Entropy equations, reversible cycles, and Carnot efficiency derivations sketched with PV diagrams.',
    summary: {
      overview: 'The Second Law of Thermodynamics dictates that entropy in an isolated system always increases. The Carnot cycle sets the theoretical maximum efficiency for heat engines.',
      keyPoints: [
        'Kelvin-Planck statement: Impossible to convert heat completely into work in a cyclic process.',
        'Clausius statement: Heat cannot spontaneously flow from colder to hotter bodies.',
        'Carnot efficiency depends solely on the absolute temperatures of heat reservoir and sink.',
        'Entropy is a state function: dS = dQ_rev / T.'
      ],
      formulas: [
        'Carnot Efficiency: η = 1 - (T_cold / T_hot)',
        'Entropy Change: ΔS = ∫ (dQ_rev / T) ≥ 0'
      ]
    },
    quiz: [
      {
        question: 'What determines the theoretical maximum efficiency of a Carnot heat engine?',
        options: [
          'The working fluid substance',
          'Only the temperatures of the hot and cold reservoirs',
          'The volume of the piston cylinder',
          'The engine operational speed'
        ],
        correct: 1,
        explanation: 'Carnot efficiency is η = 1 - (Tc / Th), strictly dependent only on reservoir absolute temperatures in Kelvin.'
      }
    ]
  },
  {
    id: 'note-3',
    title: 'Virtual Memory, Paging & TLB Hit Ratios',
    subject: 'Computer Science',
    pages: 3,
    date: '3 days ago',
    type: 'PDF',
    status: 'Summary Ready',
    excerpt: 'Handwritten address translation schematics, page table multi-level structures, and inverted page tables.',
    summary: {
      overview: 'Virtual memory isolates processes and permits address spaces exceeding physical RAM using hardware-assisted paging and Translation Lookaside Buffers.',
      keyPoints: [
        'Virtual address is partitioned into Page Number (p) and Offset (d).',
        'TLB acts as a fast associative hardware cache for frequent virtual-to-physical address mappings.',
        'Page faults invoke kernel traps to load requested pages from swap storage into available frames.',
        'Thrashing occurs when excessive page faulting stalls CPU computational progress.'
      ],
      formulas: [
        'Effective Memory Access Time (EMAT) = Hit_TLB · (T_TLB + T_RAM) + (1 - Hit_TLB) · (T_TLB + 2·T_RAM)',
        'Page Offset bits: d = log2(Page Size in bytes)'
      ]
    },
    quiz: [
      {
        question: 'What causes thrashing in an operating system?',
        options: [
          'High CPU clock frequency',
          'Excessive paging due to lack of sufficient physical memory frames',
          'Corrupted file systems',
          'Overclocked GPU thermal throttling'
        ],
        correct: 1,
        explanation: 'Thrashing occurs when the system spends more time servicing page faults and paging data in/out of swap than executing actual processes.'
      }
    ]
  },
  {
    id: 'note-4',
    title: 'Organic Reaction Mechanisms: SN1 vs SN2',
    subject: 'Chemistry',
    pages: 5,
    date: '5 days ago',
    type: 'Image (JPG)',
    status: 'Digitized',
    excerpt: 'Carbocation stability, nucleophilic attack steric hindrance, and solvent polarity effects comparison.',
    summary: {
      overview: 'Nucleophilic substitution pathways depend critically on substrate steric hindrance, nucleophile strength, leaving group quality, and solvent type.',
      keyPoints: [
        'SN1 is two-step: carbocation intermediate, favored by tertiary substrates and polar protic solvents.',
        'SN2 is concerted one-step: backside nucleophilic attack, stereochemical Walden inversion.',
        'Tertiary halides undergo SN1; primary halides undergo SN2 due to low steric congestion.',
        'Solvent choice: Polar aprotic solvents (DMSO, Acetone) dramatically accelerate SN2 reaction rates.'
      ],
      formulas: [
        'SN1 Rate = k · [Substrate]',
        'SN2 Rate = k · [Substrate] · [Nucleophile]'
      ]
    },
    quiz: [
      {
        question: 'Which solvent is optimal for accelerating an SN2 reaction?',
        options: [
          'Polar protic (Water, Ethanol)',
          'Polar aprotic (Acetone, DMSO)',
          'Nonpolar inert wax',
          'Concentrated Sulfuric Acid'
        ],
        correct: 1,
        explanation: 'Polar aprotic solvents do not hydrogen-bond with nucleophiles, leaving them un-caged and highly reactive for SN2 backside attacks.'
      }
    ]
  }
]

const SAMPLE_VIVA_QUESTIONS = [
  {
    id: 'viva-1',
    subject: 'Data Structures',
    question: 'Why do we need AVL trees if Binary Search Trees already exist?',
    answer: 'Standard BSTs can degenerate into skewed linear lists with O(n) search and insertion time when elements are inserted in sorted order. AVL trees continuously maintain balance factors in {-1, 0, 1} through rotations, guaranteeing strict O(log n) worst-case time complexity.'
  },
  {
    id: 'viva-2',
    subject: 'Thermodynamics',
    question: 'Can any heat engine achieve 100% efficiency? Explain why or why not.',
    answer: 'No. According to the Second Law of Thermodynamics (Kelvin-Planck statement), no cyclic heat engine can convert 100% of absorbed heat into work without rejecting some waste heat to a colder reservoir. The Carnot limit η = 1 - (Tc/Th) can only reach 1 if Tc = 0K (Absolute Zero), which is unattainable.'
  },
  {
    id: 'viva-3',
    subject: 'Operating Systems',
    question: 'What is the primary difference between Paging and Segmentation?',
    answer: 'Paging divides memory into fixed-size physical blocks called pages and frames, which avoids external fragmentation and is transparent to the programmer. Segmentation divides memory into variable-sized logical modules (functions, stacks, symbol tables) reflecting the programmer’s view, but can suffer from external fragmentation.'
  },
  {
    id: 'viva-4',
    subject: 'Chemistry',
    question: 'Explain why tertiary carbocations are more stable than primary carbocations.',
    answer: 'Tertiary carbocations are stabilized by hyperconjugation (delocalization of electrons from adjacent C-H or C-C σ-bonds into the vacant p-orbital) and inductive electron donation from three surrounding alkyl groups (+I effect).'
  }
]

export default function App() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  
  // Note list state & filter
  const [notes, setNotes] = useState(INITIAL_NOTES)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Upload handwritten notes state
  const [stagedFile, setStagedFile] = useState(null)
  const [uploadTitle, setUploadTitle] = useState('')
  const [uploadSubject, setUploadSubject] = useState('Computer Science')
  const [isProcessingOcr, setIsProcessingOcr] = useState(false)
  const [uploadAlert, setUploadAlert] = useState(null)

  // Interactive revision checklist
  const [revisionTasks, setRevisionTasks] = useState([
    { id: 'rev-1', title: 'Review AVL Tree Rotations', meta: 'Day 3 Spaced Repetition • 15 mins', completed: false },
    { id: 'rev-2', title: 'Quick Quiz: Carnot Engine & Entropy', meta: 'Active Recall • 10 Questions', completed: true },
    { id: 'rev-3', title: 'Operating Systems: TLB Access Time', meta: 'Day 7 Spaced Repetition • 20 mins', completed: false },
    { id: 'rev-4', title: 'Viva Flashcards: SN1 vs SN2 Mechanisms', meta: 'Oral Review • 5 Flashcards', completed: false }
  ])

  // Active summary viewer state
  const [activeSummaryId, setActiveSummaryId] = useState('note-1')

  // Interactive Quiz state
  const [activeQuizNoteId, setActiveQuizNoteId] = useState('note-1')
  const [currentQuizQIndex, setCurrentQuizQIndex] = useState(0)
  const [selectedQuizOption, setSelectedQuizOption] = useState(null)
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  // Viva Questions state (expanded answers)
  const [expandedViva, setExpandedViva] = useState({})

  // User Profile / Settings
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Chen',
    major: 'Computer Science & Engineering',
    semester: 'Semester 5',
    targetExamDate: '2026-10-28',
    notifications: true,
    dailyGoalMins: 45
  })
  const [settingsSavedAlert, setSettingsSavedAlert] = useState(false)

  // Handlers
  const toggleTaskCompletion = (taskId) => {
    setRevisionTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleStageFile = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setStagedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        type: file.type.includes('pdf') ? 'PDF' : 'Image',
        pages: file.type.includes('pdf') ? '3-5 pages estimated' : '1 page scanned'
      })
      if (!uploadTitle) {
        setUploadTitle(file.name.replace(/\.[^/.]+$/, ''))
      }
      setUploadAlert({ type: 'info', message: 'File loaded! Click "Extract Text & Digitize" to simulate OCR digitizing.' })
    }
  }

  const handleLoadSample = (sampleType) => {
    if (sampleType === 'cs') {
      setStagedFile({
        name: 'lecture_notes_graph_algorithms.pdf',
        size: '1.42 MB',
        type: 'PDF',
        pages: '4 pages handwritten'
      })
      setUploadTitle('Graph Theory: Dijkstra & Bellman-Ford')
      setUploadSubject('Computer Science')
    } else if (sampleType === 'physics') {
      setStagedFile({
        name: 'blackboard_photo_electromagnetism.png',
        size: '2.85 MB',
        type: 'Image (PNG)',
        pages: '2 pages photo capture'
      })
      setUploadTitle('Maxwell Equations & Electromagnetic Waves')
      setUploadSubject('Physics')
    } else {
      setStagedFile({
        name: 'calculus_derivatives_handout.pdf',
        size: '0.94 MB',
        type: 'PDF',
        pages: '3 pages handwritten'
      })
      setUploadTitle('Differential Equations & Laplace Transforms')
      setUploadSubject('Mathematics')
    }
    setUploadAlert({ type: 'info', message: 'Sample note staged. Click "Extract Text & Digitize" to see the digitizing simulation.' })
  }

  const handleExtractAndDigitize = () => {
    if (!stagedFile && !uploadTitle) return
    setIsProcessingOcr(true)
    setUploadAlert(null)

    setTimeout(() => {
      const newNote = {
        id: 'note-' + (notes.length + 1),
        title: uploadTitle || stagedFile?.name || 'Untitled Handwritten Note',
        subject: uploadSubject,
        pages: stagedFile?.type === 'PDF' ? 4 : 2,
        date: 'Just now',
        type: stagedFile?.type || 'PDF',
        status: 'Summary Ready',
        excerpt: 'Digitized from uploaded handwritten notes. AI concept extraction completed.',
        summary: {
          overview: `Comprehensive breakdown generated from digitized note "${uploadTitle || 'Handwritten Document'}". Key concepts and revision flashcards are ready for review.`,
          keyPoints: [
            'Core fundamentals successfully parsed from handwritten text.',
            'Structured formula blocks and variable relationships identified.',
            'Spaced repetition reminder scheduled for active recall retention.',
            'Practice quiz generated for rapid self-assessment.'
          ],
          formulas: [
            'Extracted Theorem: f(x) = ∑ (a_n · e^(i·n·x))',
            'Verification Checksum: OCR confidence 94.8%'
          ]
        },
        quiz: [
          {
            question: `What is the principal concept introduced in "${uploadTitle || 'this note'}"?`,
            options: [
              'Algorithmic complexity reduction and asymptotic optimization',
              'First-order conservation laws and boundary condition limits',
              'Core fundamentals extracted from handwritten notes',
              'Empirical measurement uncertainty limits'
            ],
            correct: 2,
            explanation: 'This sample quiz question demonstrates how AI Mate dynamically generates self-test items from newly digitized documents.'
          }
        ]
      }

      setNotes([newNote, ...notes])
      setIsProcessingOcr(false)
      setStagedFile(null)
      setUploadTitle('')
      setUploadAlert({
        type: 'success',
        message: `🎉 "${newNote.title}" successfully digitized! Summary and quiz are ready to explore.`
      })
    }, 1400)
  }

  const handleSelectNoteForSummary = (noteId) => {
    setActiveSummaryId(noteId)
    setActiveTab('summaries')
  }

  const handleSelectNoteForQuiz = (noteId) => {
    setActiveQuizNoteId(noteId)
    setCurrentQuizQIndex(0)
    setSelectedQuizOption(null)
    setIsQuizSubmitted(false)
    setActiveTab('quiz')
  }

  const toggleVivaReveal = (id) => {
    setExpandedViva(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // Current active note for summary tab
  const currentSummaryNote = notes.find(n => n.id === activeSummaryId) || notes[0]

  // Current active note for quiz tab
  const currentQuizNote = notes.find(n => n.id === activeQuizNoteId) || notes[0]
  const currentQuizQuestions = currentQuizNote.quiz || []
  const currentQuestion = currentQuizQuestions[currentQuizQIndex] || currentQuizQuestions[0]

  const handleQuizAnswer = (optionIdx) => {
    if (isQuizSubmitted) return
    setSelectedQuizOption(optionIdx)
    setIsQuizSubmitted(true)
    if (currentQuestion && optionIdx === currentQuestion.correct) {
      setQuizScore(s => s + 1)
    }
  }

  const handleNextQuizQuestion = () => {
    if (currentQuizQIndex < currentQuizQuestions.length - 1) {
      setCurrentQuizQIndex(currentQuizQIndex + 1)
      setSelectedQuizOption(null)
      setIsQuizSubmitted(false)
    } else {
      // Loop or reset for practice
      setCurrentQuizQIndex(0)
      setSelectedQuizOption(null)
      setIsQuizSubmitted(false)
    }
  }

  // Filtered notes
  const filteredNotes = notes.filter(note => {
    const matchesCat = selectedCategory === 'All' || note.subject === selectedCategory
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.subject.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  // Calculation for progress
  const completedTasksCount = revisionTasks.filter(t => t.completed).length

  return (
    <div className="app-container">
      {/* Mobile Drawer Overlay */}
      <div 
        className={`sidebar-overlay ${isMobileNavOpen ? 'mobile-open' : ''}`}
        onClick={() => setIsMobileNavOpen(false)}
      />

      {/* ====================================================================
          Sidebar Navigation
          ==================================================================== */}
      <aside className={`sidebar ${isMobileNavOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-icon">AI</div>
            <div className="brand-info">
              <h1>AI Mate</h1>
              <span className="brand-tagline">Handwritten to Learning</span>
            </div>
          </div>
          <button 
            className="sidebar-close-btn"
            onClick={() => setIsMobileNavOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-section-title">Main Menu</span>
          
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => { setActiveTab('dashboard'); setIsMobileNavOpen(false); }}
          >
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => { setActiveTab('notes'); setIsMobileNavOpen(false); }}
          >
            <span className="nav-icon">📝</span>
            <span>My Notes</span>
            <span className="nav-badge">{notes.length}</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'summaries' ? 'active' : ''}`}
            onClick={() => { setActiveTab('summaries'); setIsMobileNavOpen(false); }}
          >
            <span className="nav-icon">✨</span>
            <span>AI Summaries</span>
            <span className="nav-badge blue">New</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => { setActiveTab('quiz'); setIsMobileNavOpen(false); }}
          >
            <span className="nav-icon">🎯</span>
            <span>Practice Quiz</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'viva' ? 'active' : ''}`}
            onClick={() => { setActiveTab('viva'); setIsMobileNavOpen(false); }}
          >
            <span className="nav-icon">🎙️</span>
            <span>Viva Questions</span>
          </button>

          <span className="nav-section-title">Planning & Goals</span>

          <button 
            className={`nav-item ${activeTab === 'planner' ? 'active' : ''}`}
            onClick={() => { setActiveTab('planner'); setIsMobileNavOpen(false); }}
          >
            <span className="nav-icon">📅</span>
            <span>Study Planner</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => { setActiveTab('settings'); setIsMobileNavOpen(false); }}
          >
            <span className="nav-icon">⚙️</span>
            <span>Settings</span>
          </button>
        </nav>

        {/* Sidebar Footer with Student Profile */}
        <div className="sidebar-footer">
          <div className="user-profile-card">
            <div className="user-avatar">
              {userProfile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="user-details">
              <div className="user-name">{userProfile.name}</div>
              <div className="user-role">{userProfile.semester}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ====================================================================
          Main Application Content Wrapper
          ==================================================================== */}
      <div className="main-wrapper">
        {/* Top Navigation Bar */}
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open navigation menu"
            >
              ☰
            </button>

            <div className="topbar-search">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search notes, summaries, formulas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="topbar-actions">
            <div className="streak-pill">
              <span>🔥</span>
              <span>5-Day Streak</span>
            </div>

            <div className="study-mode-badge">
              <span>⚡</span>
              <span>Active Recall Mode</span>
            </div>

            <button 
              className="topbar-icon-btn" 
              title="Notifications"
              onClick={() => alert('Notifications: Your Day 3 spaced repetition review for "AVL Trees" is due today!')}
            >
              🔔
              <span className="notification-dot" />
            </button>
          </div>
        </header>

        {/* Main Content Viewport */}
        <main className="content-area">
          {/* ================================================================
              VIEW 1: DASHBOARD
              ================================================================ */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-view">
              {/* Welcome Banner */}
              <div className="welcome-banner">
                <div className="welcome-text">
                  <h2>
                    <span>Welcome to AI Mate, {userProfile.name.split(' ')[0]}</span>
                    <span>🎓</span>
                  </h2>
                  <p>
                    Turn handwritten lecture notes, blackboard photos, and textbooks into bite-sized 
                    AI summaries, active recall quizzes, and personalized exam schedules.
                  </p>
                  <div className="welcome-tags">
                    <span className="pill-tag">📚 OCR Note Digitizer</span>
                    <span className="pill-tag">✨ Concept Simplification</span>
                    <span className="pill-tag">🧠 Spaced Repetition Engine</span>
                    <span className="pill-tag">🎯 University Viva Prep</span>
                  </div>
                </div>
                <button 
                  className="welcome-action-btn"
                  onClick={() => {
                    const uploadElem = document.getElementById('upload-section');
                    if (uploadElem) uploadElem.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  + Upload New Notes
                </button>
              </div>

              {/* ============================================================
                  Prominent Upload Handwritten Notes Section
                  ============================================================ */}
              <section className="upload-section" id="upload-section">
                <div className="section-header">
                  <div className="section-title-wrap">
                    <div className="section-icon">📤</div>
                    <div>
                      <h3 className="section-title">Upload Handwritten Notes</h3>
                      <p className="section-subtitle">
                        Select scanned images or PDFs of your notebook pages to begin OCR extraction
                      </p>
                    </div>
                  </div>
                  <span className="badge-tag">Drag & Drop Supported</span>
                </div>

                {/* Upload Dropzone */}
                <label 
                  htmlFor="file-upload-input" 
                  className="upload-dropzone"
                >
                  <div className="upload-icon-circle">
                    📁
                  </div>
                  <h3>Click to browse or drag and drop your handwritten notes</h3>
                  <p>
                    Supports camera snapshots, scanned handouts, and multi-page notebooks.
                  </p>
                  <div className="file-type-chips">
                    <span className="file-chip">📄 Multi-page PDF</span>
                    <span className="file-chip">🖼️ PNG / JPG / JPEG</span>
                    <span className="file-chip">📱 Mobile Scans</span>
                  </div>

                  <input 
                    id="file-upload-input" 
                    type="file" 
                    accept=".pdf,image/png,image/jpeg,image/jpg" 
                    className="hidden-file-input"
                    onChange={handleStageFile}
                  />
                </label>

                {/* Quick Sample Presets (for instant interactive testing) */}
                <div className="sample-presets">
                  <span className="sample-presets-title">⚡ Or load sample notes instantly:</span>
                  <button 
                    type="button" 
                    className="sample-btn"
                    onClick={() => handleLoadSample('cs')}
                  >
                    📝 Graph Algorithms (CS)
                  </button>
                  <button 
                    type="button" 
                    className="sample-btn"
                    onClick={() => handleLoadSample('physics')}
                  >
                    ⚡ Maxwell Equations (Physics)
                  </button>
                  <button 
                    type="button" 
                    className="sample-btn"
                    onClick={() => handleLoadSample('math')}
                  >
                    📐 Differential Equations (Math)
                  </button>
                </div>

                {/* Upload Input Metadata */}
                <div className="upload-controls">
                  <div className="upload-input-group">
                    <label>Note Title / Topic</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Chapter 4: Binary Trees & Heaps"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                    />
                  </div>

                  <div className="upload-input-group">
                    <label>Course / Subject</label>
                    <select 
                      value={uploadSubject} 
                      onChange={(e) => setUploadSubject(e.target.value)}
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Physics">Physics</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                    </select>
                  </div>

                  <div className="upload-input-group" style={{ justifyContent: 'flex-end' }}>
                    <label style={{ visibility: 'hidden' }}>Action</label>
                    <button 
                      type="button" 
                      className="btn-primary"
                      disabled={isProcessingOcr || (!stagedFile && !uploadTitle)}
                      onClick={handleExtractAndDigitize}
                    >
                      {isProcessingOcr ? '⏳ Digitizing OCR...' : '🚀 Extract Text & Digitize'}
                    </button>
                  </div>
                </div>

                {/* Staged File Card if present */}
                {stagedFile && (
                  <div className="staged-file-card">
                    <div className="staged-file-info">
                      <div className="staged-file-icon">
                        {stagedFile.type.includes('PDF') ? '📑' : '🖼️'}
                      </div>
                      <div>
                        <div className="staged-file-name">{stagedFile.name}</div>
                        <div className="staged-file-meta">
                          <span>{stagedFile.size}</span>
                          <span>•</span>
                          <span>{stagedFile.pages}</span>
                          <span>•</span>
                          <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Ready for OCR</span>
                        </div>
                      </div>
                    </div>

                    <div className="staged-file-actions">
                      <button 
                        type="button" 
                        className="btn-outline"
                        onClick={() => setStagedFile(null)}
                      >
                        Clear File
                      </button>
                      <button 
                        type="button" 
                        className="btn-primary"
                        disabled={isProcessingOcr}
                        onClick={handleExtractAndDigitize}
                      >
                        {isProcessingOcr ? 'Extracting Text...' : 'Start Extraction'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Status / Preview Alert */}
                {uploadAlert && (
                  <div className={`upload-status-alert ${uploadAlert.type}`}>
                    <span>{uploadAlert.type === 'success' ? '✅' : 'ℹ️'}</span>
                    <span>{uploadAlert.message}</span>
                  </div>
                )}
              </section>

              {/* ============================================================
                  Overview Metric / Stats Cards
                  ============================================================ */}
              <div className="stats-grid">
                {/* 1. Total Notes */}
                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-label">Total Notes</span>
                    <div className="stat-icon lavender">📚</div>
                  </div>
                  <div className="stat-value">{notes.length}</div>
                  <div className="stat-footer">
                    <span className="stat-trend positive">↑ +2 this week</span>
                    <span>• Handwritten</span>
                  </div>
                </div>

                {/* 2. Summaries Created */}
                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-label">Summaries Created</span>
                    <div className="stat-icon blue">✨</div>
                  </div>
                  <div className="stat-value">{notes.length}</div>
                  <div className="stat-footer">
                    <span className="stat-trend positive">100% digitized</span>
                    <span>• AI structured</span>
                  </div>
                </div>

                {/* 3. Quizzes Completed */}
                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-label">Quizzes Completed</span>
                    <div className="stat-icon emerald">🎯</div>
                  </div>
                  <div className="stat-value">32</div>
                  <div className="stat-footer">
                    <span className="stat-trend positive">89% Avg. score</span>
                    <span>• Active recall</span>
                  </div>
                </div>

                {/* 4. Study Progress */}
                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-label">Study Progress</span>
                    <div className="stat-icon amber">📈</div>
                  </div>
                  <div className="stat-value">76%</div>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar-fill" style={{ width: '76%' }} />
                  </div>
                  <div className="stat-footer">
                    <span className="stat-trend positive">Ahead of schedule</span>
                    <span>• Midterms prep</span>
                  </div>
                </div>
              </div>

              {/* ============================================================
                  2-Column Dashboard Grid: Recent Notes & Exam/Revision Schedule
                  ============================================================ */}
              <div className="dashboard-grid">
                {/* Left Column: Recent Notes */}
                <section className="recent-notes-card">
                  <div className="section-header">
                    <div className="section-title-wrap">
                      <div className="section-icon">📝</div>
                      <div>
                        <h3 className="section-title">Recent Notes</h3>
                        <p className="section-subtitle">Recently uploaded and digitized study materials</p>
                      </div>
                    </div>
                    <button 
                      className="btn-outline"
                      onClick={() => setActiveTab('notes')}
                    >
                      View All
                    </button>
                  </div>

                  {/* Subject Filter Pills */}
                  <div className="filter-pills">
                    {['All', 'Computer Science', 'Physics', 'Mathematics', 'Chemistry'].map(cat => (
                      <button 
                        key={cat}
                        className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Notes List */}
                  <div className="notes-list">
                    {filteredNotes.slice(0, 4).map(note => (
                      <div key={note.id} className="note-item">
                        <div className="note-main">
                          <div className="note-type-badge">
                            {note.type.includes('PDF') ? '📑' : '🖼️'}
                          </div>
                          <div className="note-info">
                            <h4>{note.title}</h4>
                            <div className="note-meta">
                              <span className="badge-tag">{note.subject}</span>
                              <span>{note.pages} pages</span>
                              <span>•</span>
                              <span>{note.date}</span>
                              <span className="status-chip primary">{note.status}</span>
                            </div>
                          </div>
                        </div>

                        <div className="note-actions">
                          <button 
                            className="btn-sm-action primary"
                            onClick={() => handleSelectNoteForSummary(note.id)}
                            title="Inspect AI generated summary"
                          >
                            Summary
                          </button>
                          <button 
                            className="btn-sm-action"
                            onClick={() => handleSelectNoteForQuiz(note.id)}
                            title="Take practice quiz"
                          >
                            Quiz
                          </button>
                        </div>
                      </div>
                    ))}

                    {filteredNotes.length === 0 && (
                      <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                        No notes found for this category or search query.
                      </p>
                    )}
                  </div>
                </section>

                {/* Right Column: Upcoming Exam & Personalized Revision Schedule */}
                <div className="schedule-column">
                  {/* Upcoming Exams Card */}
                  <section className="schedule-card">
                    <div className="section-header">
                      <div className="section-title-wrap">
                        <div className="section-icon" style={{ background: 'var(--blue-light)', color: 'var(--blue)' }}>
                          ⏳
                        </div>
                        <div>
                          <h3 className="section-title">Upcoming Exams</h3>
                          <p className="section-subtitle">Countdowns and syllabus readiness</p>
                        </div>
                      </div>
                    </div>

                    <div className="exam-list">
                      <div className="exam-item">
                        <div className="exam-info">
                          <h4>Data Structures & Algorithms Midterm</h4>
                          <span className="exam-date">October 18, 2026 • 82% syllabus covered</span>
                        </div>
                        <div className="exam-countdown-badge">
                          <div className="days-count">6</div>
                          <div className="days-label">Days Left</div>
                        </div>
                      </div>

                      <div className="exam-item">
                        <div className="exam-info">
                          <h4>Engineering Physics & Thermo Exam</h4>
                          <span className="exam-date">October 27, 2026 • 64% syllabus covered</span>
                        </div>
                        <div className="exam-countdown-badge">
                          <div className="days-count">15</div>
                          <div className="days-label">Days Left</div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Personalized Revision Schedule Card */}
                  <section className="schedule-card">
                    <div className="section-header">
                      <div className="section-title-wrap">
                        <div className="section-icon">🧠</div>
                        <div>
                          <h3 className="section-title">Personalized Revision</h3>
                          <p className="section-subtitle">
                            Spaced repetition queue ({completedTasksCount}/{revisionTasks.length} done today)
                          </p>
                        </div>
                      </div>
                      <span className="spaced-badge">Ebbinghaus Curve</span>
                    </div>

                    <div className="revision-list">
                      {revisionTasks.map(task => (
                        <div 
                          key={task.id} 
                          className={`revision-task ${task.completed ? 'completed' : ''}`}
                        >
                          <input 
                            type="checkbox"
                            className="revision-checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                            id={task.id}
                          />
                          <label htmlFor={task.id} className="revision-details" style={{ cursor: 'pointer' }}>
                            <div className="revision-title">{task.title}</div>
                            <div className="revision-meta">
                              <span>{task.meta}</span>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              VIEW 2: MY NOTES (Full Repository)
              ================================================================ */}
          {activeTab === 'notes' && (
            <div className="notes-view">
              <div className="view-header">
                <div>
                  <h2>My Handwritten Notes</h2>
                  <p>Browse all digitized lecture notebooks, scanned problem sheets, and study materials</p>
                </div>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    setActiveTab('dashboard');
                    setTimeout(() => {
                      document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  + Upload New Note
                </button>
              </div>

              {/* Filter Pills */}
              <div className="filter-pills" style={{ marginBottom: '1.5rem' }}>
                {['All', 'Computer Science', 'Physics', 'Mathematics', 'Chemistry'].map(cat => (
                  <button 
                    key={cat}
                    className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid of Notes */}
              <div className="notes-grid">
                {filteredNotes.map(note => (
                  <div key={note.id} className="note-grid-card">
                    <div>
                      <div className="note-grid-header">
                        <span className="badge-tag">{note.subject}</span>
                        <span className="status-chip success">{note.status}</span>
                      </div>
                      <div className="note-grid-content">
                        <h3>{note.title}</h3>
                        <p>{note.excerpt}</p>
                      </div>
                    </div>

                    <div>
                      <div className="note-meta" style={{ marginBottom: '0.85rem' }}>
                        <span>{note.type}</span>
                        <span>•</span>
                        <span>{note.pages} pages</span>
                        <span>•</span>
                        <span>{note.date}</span>
                      </div>
                      <div className="note-grid-footer">
                        <button 
                          className="btn-sm-action primary"
                          onClick={() => handleSelectNoteForSummary(note.id)}
                        >
                          View Summary
                        </button>
                        <button 
                          className="btn-sm-action"
                          onClick={() => handleSelectNoteForQuiz(note.id)}
                        >
                          Practice Quiz
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================
              VIEW 3: AI SUMMARIES
              ================================================================ */}
          {activeTab === 'summaries' && (
            <div className="summaries-view">
              <div className="view-header">
                <div>
                  <h2>AI Notes Summaries</h2>
                  <p>Bite-sized concept synthesis, formula cards, and revision key takeaways</p>
                </div>
                <button 
                  className="btn-outline"
                  onClick={() => setActiveTab('dashboard')}
                >
                  ← Back to Dashboard
                </button>
              </div>

              <div className="summaries-layout">
                {/* Left Note Picker */}
                <div className="summary-sidebar-list">
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', padding: '0 0.5rem' }}>
                    Select Digitized Note
                  </h4>
                  {notes.map(n => (
                    <button
                      key={n.id}
                      className={`summary-sidebar-item ${activeSummaryId === n.id ? 'active' : ''}`}
                      onClick={() => setActiveSummaryId(n.id)}
                    >
                      <h4>{n.title}</h4>
                      <span className="badge-tag">{n.subject}</span>
                    </button>
                  ))}
                </div>

                {/* Right Structured Summary Reader */}
                <div className="summary-detail-card">
                  <div className="summary-meta-bar">
                    <div>
                      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                        {currentSummaryNote.title}
                      </h2>
                      <div className="note-meta">
                        <span className="badge-tag">{currentSummaryNote.subject}</span>
                        <span>{currentSummaryNote.pages} pages scanned</span>
                        <span>•</span>
                        <span style={{ color: 'var(--primary)', fontWeight: 600 }}>OCR verified</span>
                      </div>
                    </div>
                    <button 
                      className="btn-primary"
                      onClick={() => handleSelectNoteForQuiz(currentSummaryNote.id)}
                    >
                      Take Quiz on this Note 🎯
                    </button>
                  </div>

                  <div className="summary-section-box">
                    <h4>Executive Summary</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                      {currentSummaryNote.summary.overview}
                    </p>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '1.5rem 0 0.85rem' }}>
                    Key Takeaways & Core Concepts
                  </h3>
                  <ul className="key-points-list">
                    {currentSummaryNote.summary.keyPoints.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>

                  {currentSummaryNote.summary.formulas && currentSummaryNote.summary.formulas.length > 0 && (
                    <>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '1.5rem 0 0.85rem' }}>
                        Core Formulas & Mathematical Relations
                      </h3>
                      {currentSummaryNote.summary.formulas.map((formula, idx) => (
                        <div key={idx} className="formula-card">
                          {formula}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              VIEW 4: PRACTICE QUIZ (Interactive Active Recall)
              ================================================================ */}
          {activeTab === 'quiz' && (
            <div className="quiz-view">
              <div className="view-header">
                <div>
                  <h2>Practice Quiz & Active Recall</h2>
                  <p>AI-generated multiple-choice questions derived directly from your notes</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <span className="pill-tag" style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700 }}>
                    Score: {quizScore} points
                  </span>
                  <button className="btn-outline" onClick={() => setActiveTab('dashboard')}>
                    ← Dashboard
                  </button>
                </div>
              </div>

              <div className="quiz-container">
                <div className="quiz-card">
                  <div className="quiz-header">
                    <span className="badge-tag">{currentQuizNote.title}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      Question {currentQuizQIndex + 1} of {currentQuizQuestions.length}
                    </span>
                  </div>

                  {currentQuestion ? (
                    <>
                      <div className="quiz-question-text">
                        {currentQuestion.question}
                      </div>

                      <div className="quiz-options">
                        {currentQuestion.options.map((option, idx) => {
                          let optClass = ''
                          if (isQuizSubmitted) {
                            if (idx === currentQuestion.correct) optClass = 'correct'
                            else if (idx === selectedQuizOption) optClass = 'incorrect'
                          } else if (selectedQuizOption === idx) {
                            optClass = 'selected'
                          }

                          return (
                            <button
                              key={idx}
                              className={`quiz-option-btn ${optClass}`}
                              onClick={() => handleQuizAnswer(idx)}
                              disabled={isQuizSubmitted}
                            >
                              <span style={{ 
                                width: '24px', 
                                height: '24px', 
                                borderRadius: '50%', 
                                border: '1px solid currentColor', 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 700
                              }}>
                                {String.fromCharCode(65 + idx)}
                              </span>
                              <span>{option}</span>
                            </button>
                          )
                        })}
                      </div>

                      {isQuizSubmitted && (
                        <div className={`quiz-feedback ${selectedQuizOption === currentQuestion.correct ? 'correct' : 'incorrect'}`}>
                          <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>
                            {selectedQuizOption === currentQuestion.correct ? '🎉 Correct Answer!' : '❌ Incorrect'}
                          </div>
                          <div>{currentQuestion.explanation}</div>
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                        {isQuizSubmitted ? (
                          <button 
                            className="btn-primary"
                            onClick={handleNextQuizQuestion}
                          >
                            {currentQuizQIndex < currentQuizQuestions.length - 1 ? 'Next Question →' : 'Restart Quiz ↺'}
                          </button>
                        ) : (
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            Select an option above to check your answer
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <p>No questions generated for this note yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              VIEW 5: VIVA QUESTIONS (Oral Exam Preparation)
              ================================================================ */}
          {activeTab === 'viva' && (
            <div className="viva-view">
              <div className="view-header">
                <div>
                  <h2>Viva & Oral Exam Flashcards</h2>
                  <p>Prepare for professor interviews, practical vivas, and conceptual oral defense</p>
                </div>
                <button className="btn-outline" onClick={() => setActiveTab('dashboard')}>
                  ← Dashboard
                </button>
              </div>

              <div className="viva-list">
                {SAMPLE_VIVA_QUESTIONS.map(viva => (
                  <div key={viva.id} className="viva-card">
                    <div className="viva-question-header">
                      <div>
                        <span className="badge-tag" style={{ marginBottom: '0.4rem', display: 'inline-block' }}>
                          {viva.subject}
                        </span>
                        <h3>{viva.question}</h3>
                      </div>
                      <button 
                        className="btn-sm-action primary"
                        onClick={() => toggleVivaReveal(viva.id)}
                      >
                        {expandedViva[viva.id] ? 'Hide Answer ✕' : 'Reveal Answer 👁️'}
                      </button>
                    </div>

                    {expandedViva[viva.id] && (
                      <div className="viva-answer-box">
                        <strong>Model Examiner Answer:</strong>
                        <p style={{ marginTop: '0.4rem' }}>{viva.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================
              VIEW 6: STUDY PLANNER (Spaced Repetition Calendar)
              ================================================================ */}
          {activeTab === 'planner' && (
            <div className="planner-view">
              <div className="view-header">
                <div>
                  <h2>Weekly Revision Planner</h2>
                  <p>Cognitive spaced repetition schedule (Day 1, 3, 7, 14 intervals)</p>
                </div>
                <button className="btn-outline" onClick={() => setActiveTab('dashboard')}>
                  ← Dashboard
                </button>
              </div>

              <div className="planner-grid">
                {[
                  { day: 'Mon', date: '12', today: true, tasks: [{ title: 'AVL Rotations', type: 'Day 3 Revision', color: 'primary' }, { title: 'Thermo Quiz', type: '10 Qs Recall', color: 'amber' }] },
                  { day: 'Tue', date: '13', tasks: [{ title: 'OS Paging & TLB', type: 'Day 7 Revision', color: 'blue' }] },
                  { day: 'Wed', date: '14', tasks: [{ title: 'Chemistry SN1/SN2', type: 'Day 3 Revision', color: 'primary' }, { title: 'Viva Prep', type: 'Oral cards', color: 'blue' }] },
                  { day: 'Thu', date: '15', tasks: [{ title: 'Graph Dijkstra', type: 'New Note', color: 'amber' }] },
                  { day: 'Fri', date: '16', tasks: [{ title: 'Midterm Mock Quiz', type: 'Full Quiz', color: 'primary' }] },
                  { day: 'Sat', date: '17', tasks: [{ title: 'Formula Review', type: 'Flashcards', color: 'blue' }] },
                  { day: 'Sun', date: '18', tasks: [{ title: 'Exam Day 🎯', type: 'Midterm', color: 'amber' }] },
                ].map((col, idx) => (
                  <div key={idx} className={`planner-day-col ${col.today ? 'today' : ''}`}>
                    <div className="planner-day-header">
                      <div className="planner-day-name">{col.day}</div>
                      <div className="planner-day-date">{col.date}</div>
                    </div>
                    <div>
                      {col.tasks.map((t, tIdx) => (
                        <div key={tIdx} className={`planner-slot ${t.color}`}>
                          <div className="planner-slot-title">{t.title}</div>
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{t.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================
              VIEW 7: SETTINGS
              ================================================================ */}
          {activeTab === 'settings' && (
            <div className="settings-view">
              <div className="view-header">
                <div>
                  <h2>Student Settings & Preferences</h2>
                  <p>Configure your academic profile, exam dates, and revision intervals</p>
                </div>
                <button className="btn-outline" onClick={() => setActiveTab('dashboard')}>
                  ← Dashboard
                </button>
              </div>

              <div className="settings-card">
                <div className="settings-group">
                  <label>Student Full Name</label>
                  <input 
                    type="text" 
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  />
                </div>

                <div className="settings-group">
                  <label>Major / Course of Study</label>
                  <input 
                    type="text" 
                    value={userProfile.major}
                    onChange={(e) => setUserProfile({ ...userProfile, major: e.target.value })}
                  />
                </div>

                <div className="settings-group">
                  <label>Academic Semester</label>
                  <input 
                    type="text" 
                    value={userProfile.semester}
                    onChange={(e) => setUserProfile({ ...userProfile, semester: e.target.value })}
                  />
                </div>

                <div className="settings-group">
                  <label>Target Upcoming Exam Date</label>
                  <input 
                    type="date" 
                    value={userProfile.targetExamDate}
                    onChange={(e) => setUserProfile({ ...userProfile, targetExamDate: e.target.value })}
                  />
                </div>

                <div className="settings-group">
                  <label>Daily Study Target (Minutes)</label>
                  <input 
                    type="number" 
                    value={userProfile.dailyGoalMins}
                    onChange={(e) => setUserProfile({ ...userProfile, dailyGoalMins: Number(e.target.value) })}
                  />
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      setSettingsSavedAlert(true);
                      setTimeout(() => setSettingsSavedAlert(false), 2500);
                    }}
                  >
                    Save Preferences
                  </button>
                  {settingsSavedAlert && (
                    <span style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: 700 }}>
                      ✅ Preferences updated!
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
