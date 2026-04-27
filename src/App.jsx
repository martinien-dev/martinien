import { useEffect, useMemo, useState } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './App.css'
import threadsIcon from './assets/thread.png'
import profileImage from './assets/profile.jpg'

function App() {
  const [language, setLanguage] = useState('en')
  const [commentName, setCommentName] = useState('')
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState([])
  const [likedCommentIds, setLikedCommentIds] = useState([])
  const [replyDrafts, setReplyDrafts] = useState({})
  const [theme, setTheme] = useState('dark')
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  const uiTranslations = {
    en: {
      navAbout: 'About',
      navSkills: 'Skills',
      navProjects: 'Projects',
      navCertificates: 'Certificates',
      navContact: 'Contact',
      heroEyebrow: 'Software Developer & Elite Athlete',
      heroTitle: 'Building Powerful Digital Experiences With Discipline and Vision',
      heroLead:
        'I am Iradukunda Nshimyeyo Martinien, an 18-year-old developer from Huye, Rwanda. I bring the discipline of volleyball and football into software development to create focused, reliable, and high-impact solutions.',
      hireMe: 'Hire Me',
      viewProjects: 'View Projects',
      quickProfile: 'Quick Profile',
      name: 'Name',
      age: 'Age',
      location: 'Location',
      focus: 'Focus',
      fullstack: 'Full-Stack Web Development',
      aboutTitle: 'About Me',
      aboutBody:
        'I am a passionate software developer and competitive athlete who thrives on challenge, consistency, and growth. Through sports, I have built discipline, teamwork, and mental resilience, and I apply those same values to every line of code I write. My mission is to create technology that solves real-world problems and inspires positive change.',
      commentsTitle: 'Comments & Wishes',
      commentsSubtitle: 'Leave a message, feedback, or your best wishes.',
      yourName: 'Your name',
      yourMessage: 'Your comment or wish',
      addComment: 'Post Comment',
      emptyComments: 'No comments yet. Be the first to leave one.',
      languageLabel: 'Language',
      likes: 'Likes',
      like: 'Like',
      reply: 'Reply',
      delete: 'Delete',
      replyName: 'Reply name',
      replyMessage: 'Write a reply',
      postReply: 'Post Reply',
      unlike: 'Unlike',
      hireTitle: 'Hiring Desk',
      hireSubtitle: 'Direct hiring channels',
      hireEmail: 'Send Email',
      hireCall: 'Call Now',
      hireLinkedIn: 'Open LinkedIn',
      hireGithub: 'Open GitHub',
      emailDirect: 'Email Me Directly',
      darkMode: 'Dark',
      lightMode: 'Light',
    },
    fr: { navAbout: 'A propos', navSkills: 'Competences', navProjects: 'Projets', navCertificates: 'Certificats', navContact: 'Contact', heroEyebrow: 'Developpeur logiciel et athlete elite', heroTitle: 'Creer des experiences numeriques puissantes avec discipline et vision', heroLead: 'Je suis Iradukunda Nshimyeyo Martinien, developpeur de 18 ans a Huye, Rwanda. La discipline du volley-ball et du football guide ma maniere de concevoir des solutions fiables et impactantes.', hireMe: 'Engagez-moi', viewProjects: 'Voir les projets', quickProfile: 'Profil rapide', name: 'Nom', age: 'Age', location: 'Lieu', focus: 'Specialite', fullstack: 'Developpement web full-stack', aboutTitle: 'A propos de moi', aboutBody: 'Je suis un developpeur passionne et un athlete competitif, motive par le defi, la regularite et la progression. Les valeurs du sport renforcent ma facon de coder pour creer de vraies solutions utiles.', commentsTitle: 'Commentaires et voeux', commentsSubtitle: 'Laissez un message, un avis ou un voeu.', yourName: 'Votre nom', yourMessage: 'Votre commentaire ou voeu', addComment: 'Publier', emptyComments: 'Aucun commentaire pour le moment.', languageLabel: 'Langue' },
    es: { navAbout: 'Sobre mi', navSkills: 'Habilidades', navProjects: 'Proyectos', navCertificates: 'Certificados', navContact: 'Contacto', heroEyebrow: 'Desarrollador de software y atleta elite', heroTitle: 'Construyendo experiencias digitales poderosas con disciplina y vision', heroLead: 'Soy Iradukunda Nshimyeyo Martinien, desarrollador de 18 anos de Huye, Ruanda. Llevo la disciplina del voleibol y el futbol al desarrollo para crear soluciones confiables y de alto impacto.', hireMe: 'Contratame', viewProjects: 'Ver proyectos', quickProfile: 'Perfil rapido', name: 'Nombre', age: 'Edad', location: 'Ubicacion', focus: 'Enfoque', fullstack: 'Desarrollo web full-stack', aboutTitle: 'Sobre mi', aboutBody: 'Soy un desarrollador apasionado y atleta competitivo. La disciplina, el trabajo en equipo y la resiliencia del deporte impulsan cada proyecto tecnologico que construyo.', commentsTitle: 'Comentarios y deseos', commentsSubtitle: 'Deja un comentario, sugerencia o buenos deseos.', yourName: 'Tu nombre', yourMessage: 'Tu comentario o deseo', addComment: 'Publicar', emptyComments: 'Aun no hay comentarios.', languageLabel: 'Idioma' },
    ar: { navAbout: 'نبذة', navSkills: 'المهارات', navProjects: 'المشاريع', navCertificates: 'الشهادات', navContact: 'تواصل', heroEyebrow: 'مطور برمجيات ورياضي محترف', heroTitle: 'ابني تجارب رقمية قوية بالانضباط والرؤية', heroLead: 'انا ايرادوكوندا نشيمييو مارتينيان، مطور عمره 18 سنة من هويه رواندا. انقل انضباط الكرة الطائرة وكرة القدم الى البرمجة لبناء حلول موثوقة وعالية الاثر.', hireMe: 'وظفني', viewProjects: 'عرض المشاريع', quickProfile: 'ملف سريع', name: 'الاسم', age: 'العمر', location: 'الموقع', focus: 'التخصص', fullstack: 'تطوير ويب متكامل', aboutTitle: 'من انا', aboutBody: 'انا مطور شغوف ورياضي تنافسي. قيم الانضباط والعمل الجماعي والصمود من الرياضة توجه كل سطر اكتبها في البرمجة.', commentsTitle: 'التعليقات والتمنيات', commentsSubtitle: 'اترك رسالة او ملاحظة او تمنياتك.', yourName: 'اسمك', yourMessage: 'تعليقك او تمنيتك', addComment: 'نشر التعليق', emptyComments: 'لا توجد تعليقات بعد.', languageLabel: 'اللغة' },
    zh: { navAbout: '关于', navSkills: '技能', navProjects: '项目', navCertificates: '证书', navContact: '联系', heroEyebrow: '软件开发者与精英运动员', heroTitle: '以纪律和远见打造有影响力的数字体验', heroLead: '我是来自卢旺达胡耶的18岁开发者 Iradukunda Nshimyeyo Martinien。我将排球和足球的纪律与团队精神带入技术工作，打造高质量解决方案。', hireMe: '联系合作', viewProjects: '查看项目', quickProfile: '个人简介', name: '姓名', age: '年龄', location: '地点', focus: '方向', fullstack: '全栈开发', aboutTitle: '关于我', aboutBody: '我是一名热爱挑战的软件开发者和运动员。体育塑造了我的纪律、协作和韧性，也成为我写好每一行代码的基础。', commentsTitle: '留言与祝福', commentsSubtitle: '欢迎留下你的建议、留言或祝福。', yourName: '你的名字', yourMessage: '你的留言或祝福', addComment: '发布', emptyComments: '还没有留言。', languageLabel: '语言' },
    pt: { navAbout: 'Sobre', navSkills: 'Habilidades', navProjects: 'Projetos', navCertificates: 'Certificados', navContact: 'Contato', heroEyebrow: 'Desenvolvedor de software e atleta de elite', heroTitle: 'Construindo experiencias digitais com disciplina e visao', heroLead: 'Sou Iradukunda Nshimyeyo Martinien, desenvolvedor de 18 anos de Huye, Ruanda. Levo a disciplina do voleibol e do futebol para a tecnologia, criando solucoes confiaveis e impactantes.', hireMe: 'Contrate-me', viewProjects: 'Ver projetos', quickProfile: 'Perfil rapido', name: 'Nome', age: 'Idade', location: 'Local', focus: 'Foco', fullstack: 'Desenvolvimento web full-stack', aboutTitle: 'Sobre mim', aboutBody: 'Sou um desenvolvedor apaixonado e atleta competitivo. Disciplina, colaboracao e resiliencia orientam meu trabalho em cada projeto.', commentsTitle: 'Comentarios e desejos', commentsSubtitle: 'Deixe sua mensagem, opiniao ou desejo.', yourName: 'Seu nome', yourMessage: 'Seu comentario ou desejo', addComment: 'Publicar', emptyComments: 'Nenhum comentario ainda.', languageLabel: 'Idioma' },
    ru: { navAbout: 'Обо мне', navSkills: 'Навыки', navProjects: 'Проекты', navCertificates: 'Сертификаты', navContact: 'Контакты', heroEyebrow: 'Разработчик и элитный спортсмен', heroTitle: 'Создаю сильные цифровые решения с дисциплиной и видением', heroLead: 'Я Ирадукунда Ншимиё Мартиньен, 18-летний разработчик из Хуе, Руанда. Спортивная дисциплин�� и командная работа помогают мне создавать надежные технологические продукты.', hireMe: 'Нанять меня', viewProjects: 'Смотреть проекты', quickProfile: 'Краткий профиль', name: 'Имя', age: 'Возраст', location: 'Локация', focus: 'Фокус', fullstack: 'Full-stack разработка', aboutTitle: 'Обо мне', aboutBody: 'Я увлеченный разработчик и соревновательный спортсмен. Стойкость, командность и постоянство из спорта помогают мне в каждом проекте.', commentsTitle: 'Комментарии и пожелания', commentsSubtitle: 'Оставьте комментарий, идею или пожелание.', yourName: 'Ваше имя', yourMessage: 'Ваш комментарий или пожелание', addComment: 'Отправить', emptyComments: 'Комментариев пока нет.', languageLabel: 'Язык' },
    sw: { navAbout: 'Kuhusu', navSkills: 'Ujuzi', navProjects: 'Miradi', navCertificates: 'Vyeti', navContact: 'Mawasiliano', heroEyebrow: 'Msanidi programu na mwanariadha wa kiwango cha juu', heroTitle: 'Ninajenga uzoefu wa kidijitali kwa nidhamu na maono', heroLead: 'Mimi ni Iradukunda Nshimyeyo Martinien, msanidi mwenye miaka 18 kutoka Huye, Rwanda. Nidhamu kutoka mpira wa wavu na mpira wa miguu inanisaidia kujenga suluhisho bora za teknolojia.', hireMe: 'Niajiri', viewProjects: 'Tazama miradi', quickProfile: 'Wasifu wa haraka', name: 'Jina', age: 'Umri', location: 'Mahali', focus: 'Mwelekeo', fullstack: 'Uendelezaji wa wavuti full-stack', aboutTitle: 'Kuhusu mimi', aboutBody: 'Mimi ni msanidi mwenye shauku na mwanariadha mshindani. Nidhamu, ushirikiano na uvumilivu ndio msingi wa kazi yangu ya kila siku.', commentsTitle: 'Maoni na heri', commentsSubtitle: 'Acha ujumbe, ushauri au heri zako.', yourName: 'Jina lako', yourMessage: 'Maoni au heri yako', addComment: 'Tuma', emptyComments: 'Bado hakuna maoni.', languageLabel: 'Lugha' },
    hi: { navAbout: 'परिचय', navSkills: 'कौशल', navProjects: 'प्रोजेक्ट्स', navCertificates: 'सर्टिफिकेट्स', navContact: 'संपर्क', heroEyebrow: 'सॉफ्टवेयर डेवलपर और एलीट एथलीट', heroTitle: 'अनुशासन और विजन के साथ प्रभावशाली डिजिटल अनुभव बनाता हूं', heroLead: 'मैं Iradukunda Nshimyeyo Martinien हूं, Huye, Rwanda का 18 वर्षीय डेवलपर। वॉलीबॉल और फुटबॉल का अनुशासन मैं टेक्नोलॉजी समाधानों में लागू करता हूं।', hireMe: 'मुझे हायर करें', viewProjects: 'प्रोजेक्ट देखें', quickProfile: 'त्वरित प्रोफाइल', name: 'नाम', age: 'उम्र', location: 'स्थान', focus: 'फोकस', fullstack: 'फुल-स्टैक वेब डेवलपमेंट', aboutTitle: 'मेरे बारे में', aboutBody: 'मैं एक उत्साही डेवलपर और प्रतिस्पर्धी एथलीट हूं। खेल से मिले अनुशासन, टीमवर्क और दृढ़ता को मैं हर कोड में लागू करता हूं।', commentsTitle: 'टिप्पणियां और शुभकामनाएं', commentsSubtitle: 'अपना संदेश, सुझाव या शुभकामना लिखें।', yourName: 'आपका नाम', yourMessage: 'आपकी टिप्पणी या शुभकामना', addComment: 'पोस्ट करें', emptyComments: 'अभी तक कोई टिप्पणी नहीं।', languageLabel: 'भाषा' },
    de: { navAbout: 'Uber mich', navSkills: 'Fahigkeiten', navProjects: 'Projekte', navCertificates: 'Zertifikate', navContact: 'Kontakt', heroEyebrow: 'Softwareentwickler und Spitzensportler', heroTitle: 'Ich baue starke digitale Erlebnisse mit Disziplin und Vision', heroLead: 'Ich bin Iradukunda Nshimyeyo Martinien, ein 18-jahriger Entwickler aus Huye, Ruanda. Die Disziplin aus Volleyball und Fussball setze ich in wirkungsvolle Softwarelosungen um.', hireMe: 'Jetzt kontaktieren', viewProjects: 'Projekte ansehen', quickProfile: 'Kurzprofil', name: 'Name', age: 'Alter', location: 'Ort', focus: 'Fokus', fullstack: 'Full-Stack-Webentwicklung', aboutTitle: 'Uber mich', aboutBody: 'Ich bin ein leidenschaftlicher Entwickler und Wettkampfsportler. Teamarbeit, Konstanz und mentale Starke aus dem Sport pragen meine Arbeit in der Technologie.', commentsTitle: 'Kommentare und Wunsche', commentsSubtitle: 'Hinterlasse einen Kommentar oder Wunsch.', yourName: 'Dein Name', yourMessage: 'Dein Kommentar oder Wunsch', addComment: 'Senden', emptyComments: 'Noch keine Kommentare.', languageLabel: 'Sprache' },
  }

  const langOptions = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Francais' },
    { code: 'es', label: 'Espanol' },
    { code: 'ar', label: 'Arabic' },
    { code: 'zh', label: 'Chinese' },
    { code: 'pt', label: 'Portuguese' },
    { code: 'ru', label: 'Russian' },
    { code: 'sw', label: 'Swahili' },
    { code: 'hi', label: 'Hindi' },
    { code: 'de', label: 'German' },
  ]

  const t = useMemo(() => uiTranslations[language] || uiTranslations.en, [language])
  const en = uiTranslations.en
  const tr = (key) => t[key] || en[key] || key
  const linkedinUrl =
    'https://www.linkedin.com/in/iradukunda-martinien-b30711404?utm_source=share_via&utm_content=profile&utm_medium=member_android'
  const instagramUrl = 'https://www.instagram.com/martinien_._?igsh=dG15NXB5cDB3M3Yx'
  const threadsUrl = 'https://www.threads.com/@martinien_._'
  const githubUrl = 'https://github.com/martinien-dev'

  const skills = [
    { category: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'React'] },
    { category: 'Backend', items: ['Node.js', 'PHP'] },
    { category: 'Database', items: ['MySQL'] },
    { category: 'Other', items: ['System Design', 'Networking', 'Graphic Design (Figma)'] },
  ]

  const projects = [
    {
      title: 'AthleteConnect Platform',
      stack: 'React, Node.js, MySQL',
      description:
        'A full-stack web application that helps coaches and athletes manage training schedules, performance records, and team communication in one dashboard.',
      features: ['Role-based login for coach/athlete', 'Real-time training updates', 'Performance analytics'],
    },
    {
      title: 'Professional Portfolio Website',
      stack: 'React, CSS',
      description:
        'A responsive and animated personal portfolio focused on modern UI, smooth section navigation, and a strong personal brand.',
      features: ['Mobile-first layout', 'Smooth scroll navigation', 'Contact-focused call to action'],
    },
    {
      title: 'Campus Resource Management System',
      stack: 'PHP, MySQL, JavaScript',
      description:
        'A database-driven system for managing student records, equipment tracking, and request workflows with secure data handling.',
      features: ['Advanced data filtering', 'Admin reporting dashboard', 'Structured relational database'],
    },
  ]

  useEffect(() => {
    const savedComments = localStorage.getItem('portfolio-comments')
    if (savedComments) {
      const parsed = JSON.parse(savedComments)
      const normalized = parsed.map((comment) => ({
        ...comment,
        likes: Number(comment.likes || 0),
        replies: Array.isArray(comment.replies) ? comment.replies : [],
      }))
      setComments(normalized)
    }
  }, [])

  useEffect(() => {
    const savedLikes = localStorage.getItem('portfolio-liked-comments')
    if (savedLikes) {
      setLikedCommentIds(JSON.parse(savedLikes))
    }
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('portfolio-comments', JSON.stringify(comments))
  }, [comments])

  useEffect(() => {
    localStorage.setItem('portfolio-liked-comments', JSON.stringify(likedCommentIds))
  }, [likedCommentIds])

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const handleMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  const handleAddComment = (event) => {
    event.preventDefault()
    if (!commentName.trim() || !commentText.trim()) {
      return
    }

    const newComment = {
      id: Date.now(),
      name: commentName.trim(),
      text: commentText.trim(),
      createdAt: new Date().toLocaleString(),
      likes: 0,
      replies: [],
    }

    setComments((prev) => [newComment, ...prev])
    setCommentName('')
    setCommentText('')
  }

  const handleLikeComment = (commentId) => {
    const isLiked = likedCommentIds.includes(commentId)
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id !== commentId) return comment
        const nextLikes = isLiked ? Math.max((comment.likes || 0) - 1, 0) : (comment.likes || 0) + 1
        return { ...comment, likes: nextLikes }
      }),
    )
    setLikedCommentIds((prev) =>
      isLiked ? prev.filter((id) => id !== commentId) : [...prev, commentId],
    )
  }

  const handleDeleteComment = (commentId) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId))
    setReplyDrafts((prev) => {
      const next = { ...prev }
      delete next[commentId]
      return next
    })
    setLikedCommentIds((prev) => prev.filter((id) => id !== commentId))
  }

  const handleReplyDraftChange = (commentId, field, value) => {
    setReplyDrafts((prev) => ({
      ...prev,
      [commentId]: {
        ...(prev[commentId] || { name: '', text: '' }),
        [field]: value,
      },
    }))
  }

  const handleReplySubmit = (event, commentId) => {
    event.preventDefault()
    const draft = replyDrafts[commentId] || { name: '', text: '' }
    if (!draft.name?.trim() || !draft.text?.trim()) {
      return
    }

    const reply = {
      id: Date.now(),
      name: draft.name.trim(),
      text: draft.text.trim(),
      createdAt: new Date().toLocaleString(),
    }

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId ? { ...comment, replies: [reply, ...(comment.replies || [])] } : comment,
      ),
    )

    setReplyDrafts((prev) => ({
      ...prev,
      [commentId]: { name: '', text: '' },
    }))
  }

  const SocialIcon = ({ name }) => {
    if (name === 'instagram') {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm10.25 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
        </svg>
      )
    }
    if (name === 'linkedin') {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.61 0 4.28 2.37 4.28 5.45v6.3ZM5.34 7.43a2.06 2.06 0 1 1 0-4.11 2.06 2.06 0 0 1 0 4.11ZM7.12 20.45H3.56V9h3.56v11.45Z" />
        </svg>
      )
    }
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.6-1.4-5.6-6.1 0-1.4.5-2.5 1.2-3.4-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.4 1.2a11.6 11.6 0 0 1 6.1 0c2.4-1.5 3.4-1.2 3.4-1.2.6 1.6.2 2.8.1 3.1.8.9 1.2 2 1.2 3.4 0 4.8-2.9 5.8-5.6 6.1.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
      </svg>
    )
  }

  return (
    <div className="app" data-theme={theme}>
      <div className="cursor-aura" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }} />
      <div className="cursor-dot" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }} />
      <div className="cursor-ring" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }} />

      <header className="nav-wrap">
        <div className="container nav">
          <a className="brand" href="#home">
            Martinien
          </a>
          <nav>
            <a href="#about">{t.navAbout}</a>
            <a href="#skills">{t.navSkills}</a>
            <a href="#projects">{t.navProjects}</a>
            <a href="#certificates">{t.navCertificates}</a>
            <a href="#hire">Hire</a>
            <a href="#contact">{t.navContact}</a>
          </nav>
          <div className="nav-controls">
            <label className="lang-switcher" htmlFor="language">
              {t.languageLabel}
              <select id="language" value={language} onChange={(event) => setLanguage(event.target.value)}>
                {langOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            >
              {theme === 'dark' ? tr('lightMode') : tr('darkMode')}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">{t.heroEyebrow}</p>
              <h1>{t.heroTitle}</h1>
              <p className="lead">
                {t.heroLead}
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#hire">
                  {tr('hireMe')}
                </a>
                <a className="btn btn-secondary" href="#projects">
                  {t.viewProjects}
                </a>
              </div>
            </div>
            <aside className="hero-card">
              <img src={profileImage} alt="Iradukunda Martinien profile" className="profile-avatar" />
              <h2>{t.quickProfile}</h2>
              <ul>
                <li>
                  <span>{t.name}</span>
                  <strong>Iradukunda Nshimyeyo Martinien</strong>
                </li>
                <li>
                  <span>{t.age}</span>
                  <strong>18</strong>
                </li>
                <li>
                  <span>{t.location}</span>
                  <strong>Huye, Rwanda</strong>
                </li>
                <li>
                  <span>{t.focus}</span>
                  <strong>{t.fullstack}</strong>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <h2>{t.aboutTitle}</h2>
            <p>{t.aboutBody}</p>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <h2>Skills</h2>
            <div className="skills-grid">
              {skills.map((skillGroup) => (
                <article className="card" key={skillGroup.category}>
                  <h3>{skillGroup.category}</h3>
                  <ul className="tag-list">
                    {skillGroup.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <h2>Projects</h2>
            <div className="projects-grid">
              {projects.map((project) => (
                <article className="card project-card" key={project.title}>
                  <h3>{project.title}</h3>
                  <p className="stack">{project.stack}</p>
                  <p>{project.description}</p>
                  <ul>
                    {project.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="certificates" className="section">
          <div className="container">
            <h2>Certificates</h2>
            <div className="skills-grid">
              <article className="card">
                <h3>English Spelling Certificate</h3>
                <p>Recognized for excellence in language accuracy and written communication.</p>
              </article>
              <article className="card">
                <h3>One Million Coders Program</h3>
                <p>Completed intensive training in practical software development foundations.</p>
              </article>
              <article className="card">
                <h3>Udacity Certificate</h3>
                <p>Certified in project-based digital and technical skill development.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="hire" className="section">
          <div className="container">
            <h2>{tr('hireTitle')}</h2>
            <div className="skills-grid">
              <article className="card">
                <h3>{tr('hireEmail')}</h3>
                <p>Best for project details and formal collaboration requests.</p>
                <a className="btn btn-secondary" href="mailto:iradukundamartinien@gmail.com">
                  {tr('emailDirect')}
                </a>
              </article>
              <article className="card">
                <h3>{tr('hireCall')}</h3>
                <p>Fastest way for direct hiring discussions.</p>
                <a className="btn btn-secondary" href="tel:0792650912">
                  0792650912
                </a>
              </article>
              <article className="card">
                <h3>{tr('hireLinkedIn')}</h3>
                <p>Professional profile, recommendations, and work credibility.</p>
                <a
                  className="btn btn-secondary"
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                >
                  Visit LinkedIn
                </a>
              </article>
              <article className="card">
                <h3>{tr('hireGithub')}</h3>
                <p>Code repositories and technical proof of work for recruiters.</p>
                <a
                  className="btn btn-secondary"
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                >
                  Visit GitHub
                </a>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="container">
            <h2>{t.navContact}</h2>
            <p>Ready to collaborate on your next project? Let us build something outstanding.</p>
            <div className="contact-grid">
              <a href="mailto:iradukundamartinien@gmail.com">iradukundamartinien@gmail.com</a>
              <a href="tel:0792650912">0792650912</a>
              <span>Huye, Rwanda</span>
            </div>
            <div className="social-links">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram profile"
              >
                <SocialIcon name="instagram" />
                Instagram
              </a>
              <a href={threadsUrl} target="_blank" rel="noreferrer" aria-label="Threads profile">
                <img src={threadsIcon} alt="" className="social-image-icon" />
                Threads
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
              >
                <SocialIcon name="linkedin" />
                LinkedIn
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub profile">
                <SocialIcon name="github" />
                GitHub
              </a>
            </div>
          </div>
        </section>

        <section id="comments" className="section">
          <div className="container comments-wrap">
            <h2>{tr('commentsTitle')}</h2>
            <p>{tr('commentsSubtitle')}</p>

            <form className="comment-form card" onSubmit={handleAddComment}>
              <input
                type="text"
                value={commentName}
                onChange={(event) => setCommentName(event.target.value)}
                placeholder={tr('yourName')}
                maxLength={50}
                required
              />
              <textarea
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                placeholder={tr('yourMessage')}
                rows={4}
                maxLength={240}
                required
              />
              <button type="submit" className="btn btn-primary">
                {tr('addComment')}
              </button>
            </form>

            <div className="comment-list">
              {comments.length === 0 ? (
                <p className="card">{tr('emptyComments')}</p>
              ) : (
                comments.map((comment) => (
                  <article key={comment.id} className="card comment-item">
                    <div className="comment-meta">
                      <h3>{comment.name}</h3>
                      <span>{comment.createdAt}</span>
                    </div>
                    <p>{comment.text}</p>
                    <div className="comment-actions">
                      <button type="button" className="btn btn-secondary" onClick={() => handleLikeComment(comment.id)}>
                        {likedCommentIds.includes(comment.id) ? tr('unlike') : tr('like')} ({comment.likes || 0})
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={() => handleDeleteComment(comment.id)}>
                        {tr('delete')}
                      </button>
                    </div>

                    <form className="reply-form" onSubmit={(event) => handleReplySubmit(event, comment.id)}>
                      <input
                        type="text"
                        value={replyDrafts[comment.id]?.name || ''}
                        onChange={(event) => handleReplyDraftChange(comment.id, 'name', event.target.value)}
                        placeholder={tr('replyName')}
                        maxLength={40}
                        required
                      />
                      <input
                        type="text"
                        value={replyDrafts[comment.id]?.text || ''}
                        onChange={(event) => handleReplyDraftChange(comment.id, 'text', event.target.value)}
                        placeholder={tr('replyMessage')}
                        maxLength={160}
                        required
                      />
                      <button type="submit" className="btn btn-secondary">
                        {tr('postReply')}
                      </button>
                    </form>

                    {comment.replies?.length > 0 && (
                      <div className="reply-list">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="reply-item">
                            <strong>{reply.name}</strong>
                            <span>{reply.createdAt}</span>
                            <p>{reply.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Iradukunda Nshimyeyo Martinien. All rights reserved.</p>
        </div>
      </footer>
      <SpeedInsights />
    </div>
  )
}

export default App
