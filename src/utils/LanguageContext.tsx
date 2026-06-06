import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header & Brand
    'brand.initiative': 'GLOBAL INITIATIVE',
    'brand.live': 'LIVE',
    'brand.tagline': 'Xcrypto-Trading Security Global Repository',
    'brand.verified_clock': 'VERIFIED UTC CLOCK',
    'nav.menu_directory': 'MENU DIRECTORY',
    'nav.close_directory': 'CLOSE DIRECTORY',
    'nav.principal_directives': 'PRINCIPAL SYSTEM DIRECTIVES',
    'nav.specialist_index': 'SPECIALIST REPOSITORY INDEX PORTS',
    'nav.integrity_system': 'CONTENT VERIFICATION SYSTEM',
    'nav.home': 'HOME FEED',
    'nav.about': 'ABOUT XTSG',
    'nav.start': 'START HERE',
    'nav.security': 'SECURITY CENTRE',
    'nav.countries': 'COUNTRIES PORTALS',
    'nav.contact': 'CONTACT PAGE',
    'nav.classroom': 'Classroom Syllabus',
    'nav.stablecoins': 'Stablecoins & Payments',
    'nav.reviews': 'Reviews & Comparisons',
    'nav.exchanges': 'Exchanges Directory',
    'nav.blog': 'Blog & Alerts',
    'nav.resources': 'Resources & Stencils',
    'nav.faq': 'FAQs Solver',
    'nav.legal': 'Disclosures',
    'nav.collab': 'TRANSMIT COLLAB DISPATCH',
    
    // Search Drawer
    'search.master_db': 'SECURED MASTER THREAT DATABASE SEARCH INDEX',
    'search.hotkey': 'HOTKEY SUGGESTION: CTRL + K',
    'search.placeholder': 'Provide threat vector keywords (e.g., \'Quidax\', \'stablecoin\', \'seed\', \'wallet\')...',
    'search.clear': 'CLEAR',
    'search.all_matches': 'ALL MATCHES',
    'search.guides': 'GUIDES',
    'search.reviews_cap': 'REVIEWS',
    'search.blog_cap': 'BLOG & ALERTS',
    'search.countries_cap': 'COUNTRIES',
    'search.exchanges_cap': 'EXCHANGES',
    'search.indicator': 'INDICATE ANY SECURITY THREAT VECTOR KEYWORDS ABOVE TO QUERY REALTIME INTEGRITY ARCHIVE',
    'search.zero_matches': 'ZERO CRYPTO SEGMENT INDEX MATCH',

    // Inaccuracy feedback & Common buttons
    'inaccuracy.banner_title': 'Spot an outdated threat factor or coordinate mistake?',
    'inaccuracy.banner_desc': 'Help independent analysts maintain pristine audit accuracy by reporting coordinate changes instantly.',
    'inaccuracy.btn_text': 'Report inaccuracy',
    'inaccuracy.modal_header': 'VERIFICATION SYSTEM MODULE',
    'inaccuracy.modal_title': 'REPORT AN INACCURACY',
    'inaccuracy.modal_desc': 'Submit verifiable changes or correct outdated coordinates for independent review logs.',
    'inaccuracy.label_name': 'Your Name / Handle (Optional)',
    'inaccuracy.label_email': 'Email Address (Optional)',
    'inaccuracy.label_details': 'Specific Inaccuracy details & supporting coordinates',
    'inaccuracy.placeholder_name': 'e.g. Lead Analyst Connor',
    'inaccuracy.placeholder_email': 'e.g. security@csg-analyst.net',
    'inaccuracy.placeholder_details': 'Provide specific details about outdated exchange coordinates, dead checklist links, or coordinate corrections.',
    'inaccuracy.submit': 'SUBMIT SECURITY LOGS',
    'inaccuracy.cancel': 'CANCEL',
    'inaccuracy.success_title': 'INACCURACY DISPATCH LOGGED SECURELY',
    'inaccuracy.success_desc': 'Your advisories have bypassed simulation queues and are now recorded inside our local security sandboxed database cache.',
    'inaccuracy.close_panel': 'CLOSE VERIFICATION PANEL',

    // Home View Elements
    'home.alert_bar': 'URGENT LIVE ALERT TRACE',
    'home.alert_desc': 'Address poisoning networks identified on Tron TRC-20 and Arbitrum networks. Ensure full clipboard matches.',
    'home.main_title': 'PUBLIC CRYPTO AUDITING & SECURITY SANDBOX',
    'home.main_desc': 'An independent white-hat standard library cataloging malicious contracts, smart backdoors, non-compliant custodians, and global peer-to-peer security corridors.',
    'home.sec_score_title': 'VERIFY ACCOUNT OR PROTOCOL',
    'home.sec_score_placeholder': 'Paste custom codes, wallet approvals, mnemonic words or suspicious URL strings here to inspect...',
    'home.scan_btn_security': 'LAUNCH INTEGRITY SCAN',
    'home.disclaimer_title': 'EDUCATIONAL SIMULATOR DISCLAIMER & SCIENCE',
    'home.disclaimer_desc': 'This scanner is an offline signature-pattern matcher running fully inside your browser. Real-world onchain threat identification requires Transaction Simulation.'
  },
  es: {
    // Header & Brand
    'brand.initiative': 'INICIATIVA GLOBAL',
    'brand.live': 'EN VIVO',
    'brand.tagline': 'Repositorio Global de Seguridad de Xcrypto-Trading',
    'brand.verified_clock': 'RELOJ UTC VERIFICADO',
    'nav.menu_directory': 'DIRECTORIO DE MENÚ',
    'nav.close_directory': 'CERRAR DIRECTORIO',
    'nav.principal_directives': 'DIRECTIVAS PRINCIPALES DEL SISTEMA',
    'nav.specialist_index': 'PUERTOS DE ÍNDICE DE REPOSITORIO DE ESPECIALISTAS',
    'nav.integrity_system': 'SISTEMA DE VERIFICACIÓN DE CONTENIDO',
    'nav.home': 'INICIO',
    'nav.about': 'ACERCA DE XTSG',
    'nav.start': 'EMPIEZA AQUÍ',
    'nav.security': 'CENTRO DE SEGURIDAD',
    'nav.countries': 'PORTALES DE PAÍSES',
    'nav.contact': 'PÁGINA DE CONTACTO',
    'nav.classroom': 'Sílaba del Aula',
    'nav.stablecoins': 'Monedas Estables y Pagos',
    'nav.reviews': 'Reseñas y Comparativas',
    'nav.exchanges': 'Directorio de Exchanges',
    'nav.blog': 'Blog y Alertas',
    'nav.resources': 'Recursos y Plantillas',
    'nav.faq': 'Solucionador de Preguntas',
    'nav.legal': 'Avisos Legales',
    'nav.collab': 'TRANSMITIR DESPACHO DE COLABORACIÓN',

    // Search Drawer
    'search.master_db': 'ÍNDICE DE BÚSQUEDA DE LA BASE DE DATOS DE AMENAZAS MAESTRA SEGURA',
    'search.hotkey': 'SUGERENCIA DE ATRAJO: CTRL + K',
    'search.placeholder': 'Indique palabras clave de vectores de amenaza (ej. \'Quidax\', \'stablecoin\', \'semilla\', \'billetera\')...',
    'search.clear': 'LIMPIAR',
    'search.all_matches': 'TODOS LOS RESULTADOS',
    'search.guides': 'GUÍAS',
    'search.reviews_cap': 'RESEÑAS',
    'search.blog_cap': 'BLOG Y ALERTAS',
    'search.countries_cap': 'PAÍSES',
    'search.exchanges_cap': 'EXCHANGES',
    'search.indicator': 'INDIQUE CUALQUIER PALABRA CLAVE DE VECTOR DE AMENAZA ARRIBA PARA CONSULTAR EL ARCHIVO DE INTEGRIDAD EN TIEMPO REAL',
    'search.zero_matches': 'NINGUNA COINCIDENCIA EN EL ÍNDICE CRIPTO',

    // Inaccuracy feedback & Common buttons
    'inaccuracy.banner_title': '¿Detectó un factor de amenaza obsoleto o un error en las coordenadas?',
    'inaccuracy.banner_desc': 'Ayude a los analistas independientes a mantener una precisión impecable informando los cambios de forma instantánea.',
    'inaccuracy.btn_text': 'Informar inexactitud',
    'inaccuracy.modal_header': 'MÓDULO DEL SISTEMA DE VERIFICACIÓN',
    'inaccuracy.modal_title': 'INFORMAR UNA INEXACTITUD',
    'inaccuracy.modal_desc': 'Envíe cambios verificables o corrija coordenadas obsoletas para los registros de revisión independientes.',
    'inaccuracy.label_name': 'Su Nombre / Alias (Opcional)',
    'inaccuracy.label_email': 'Dirección de Correo (Opcional)',
    'inaccuracy.label_details': 'Detalles específicos de la inexactitud y coordenadas de respaldo',
    'inaccuracy.placeholder_name': 'ej. Analista Principal Connor',
    'inaccuracy.placeholder_email': 'ej. seguridad@csg-analyst.net',
    'inaccuracy.placeholder_details': 'Proporcione detalles específicos sobre coordenadas de plataformas obsoletas, enlaces de listas de verificación caídos o correcciones.',
    'inaccuracy.submit': 'ENVIAR REGISTROS DE SEGURIDAD',
    'inaccuracy.cancel': 'CANCELAR',
    'inaccuracy.success_title': 'DESPACHO DE INEXACTITUD REGISTRADO DE FORMA SEGURA',
    'inaccuracy.success_desc': 'Sus avisos han superado las colas de simulación y ahora están registrados en nuestra caché de base de datos local y segura.',
    'inaccuracy.close_panel': 'CERRAR PANEL DE VERIFICACIÓN',

    // Home View Elements
    'home.alert_bar': 'RASTREO DE ALERTA EN VIVO URGENTE',
    'home.alert_desc': 'Redes de envenenamiento de direcciones identificadas en las redes Tron TRC-20 y Arbitrum. Asegure coincidencia total del portapapeles.',
    'home.main_title': 'SINOPSIS DE AUDITORÍA CRIPTO PÚBLICA Y SIMULADOR DE SEGURIDAD',
    'home.main_desc': 'Una biblioteca estándar de sombrero blanco e independiente que cataloga contratos maliciosos, puertas traseras inteligentes, custodios no conformes y corredores globales de seguridad P2P.',
    'home.sec_score_title': 'VERIFICAR CUENTA O PROTOCOLO',
    'home.sec_score_placeholder': 'Pegue códigos personalizados, aprobaciones de billeteras, palabras mnemónicas o URL sospechosas para inspeccionar...',
    'home.scan_btn_security': 'LANCER ANÁLISIS DE INTEGRIDAD',
    'home.disclaimer_title': 'DESCARGO DE RESPONSABILIDAD DEL SIMULADOR EDUCATIVO Y CIENCIA',
    'home.disclaimer_desc': 'Este escáner es un emparejador de patrones de firma fuera de línea que se ejecuta completamente dentro de su navegador. La identificación de amenazas reales requiere simulación.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('csg_active_language');
      if (stored === 'es' || stored === 'en') return stored as Language;
    } catch (_) {}
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('csg_active_language', lang);
    } catch (_) {}
    // Emit custom event for components outside React tree if any
    window.dispatchEvent(new CustomEvent('csg-language-changed', { detail: lang }));
  };

  const t = (key: string, fallback?: string): string => {
    return translations[language][key] || translations['en'][key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
