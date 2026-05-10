import React from 'react';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const AnnouncementContent = () => (
  <a
    href="https://chat.whatsapp.com/Fpoi8MOrwxr5F3ul0PrjZ9"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 md:gap-3 text-white/95 text-xs md:text-sm font-medium tracking-wide hover:text-white transition-colors group cursor-pointer"
  >
    {/* Pulsing dot */}
    <span className="relative flex h-2 w-2 shrink-0">
      <span className="announcement-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
    </span>

    <span className="uppercase tracking-[0.15em] font-semibold text-purple-300 text-[10px] md:text-xs shrink-0">New</span>

    <span className="w-px h-3.5 bg-white/20 shrink-0"></span>

    <span>Follow this link to join Provenance WhatsApp community</span>

    <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-[11px] md:text-xs font-semibold text-green-300 group-hover:bg-green-500/20 group-hover:border-green-400/30 transition-all duration-300 shrink-0">
      <WhatsAppIcon />
      <span className="hidden sm:inline">Join Now</span>
    </span>

    <span className="w-px h-3.5 bg-white/20 shrink-0"></span>

    <span className="text-white/40 mx-4 shrink-0">✦</span>
  </a>
);

const AnnouncementBar = () => {
  return (
    <div
      id="announcement-bar"
      className="fixed top-0 left-0 right-0 h-10 z-[60] flex items-center overflow-hidden announcement-bar-bg select-none"
    >
      {/* Animated shimmer overlay */}
      <div className="absolute inset-0 announcement-shimmer pointer-events-none"></div>

      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>

      {/* Scrolling content — duplicated for seamless loop */}
      <div className="flex whitespace-nowrap announcement-scroll">
        <div className="flex items-center shrink-0">
          <AnnouncementContent />
          <AnnouncementContent />
          <AnnouncementContent />
          <AnnouncementContent />
        </div>
        <div className="flex items-center shrink-0" aria-hidden="true">
          <AnnouncementContent />
          <AnnouncementContent />
          <AnnouncementContent />
          <AnnouncementContent />
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
