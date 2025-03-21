import React from "react";

export const ClientOnlyScript: React.FC = () => {
  const scriptContent = `
    (function() {
      // Cek apakah dalam mode performa tinggi
      var isHighPerf = localStorage.getItem('highPerformanceMode') === 'true';
      
      // Tambahkan class jika perlu
      if (isHighPerf) {
        document.documentElement.classList.add('high-performance-mode');
      }
      
      // Buat tombol toggle
      function createToggleButton() {
        var button = document.createElement('button');
        button.className = 'fixed bottom-6 right-6 md:bottom-8 md:left-1/2 md:-translate-x-1/2 z-50 p-3 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 md:w-auto md:max-w-fit ' + 
          (isHighPerf ? 'bg-red-600 text-white' : 'bg-theme-600 text-white');
        
        button.innerHTML = isHighPerf ? 
          '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="2" x2="22" y2="22"></line><path d="M18.3 5.6L21.8 9l-3.5 3.5"></path><path d="M5.7 18.4L2.2 15l3.5-3.5"></path></svg><span class="text-xs md:text-sm font-medium ml-2">Lite Mode</span>' : 
          '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg><span class="text-xs md:text-sm font-medium ml-2">Normal Mode</span>';
        
        button.onclick = function() {
          isHighPerf = !isHighPerf;
          localStorage.setItem('highPerformanceMode', isHighPerf);
          
          if (isHighPerf) {
            document.documentElement.classList.add('high-performance-mode');
          } else {
            document.documentElement.classList.remove('high-performance-mode');
          }
          
          // Untuk perubahan instan, reload halaman
          window.location.reload();
        };
        
        document.body.appendChild(button);
      }
      
      // Tunggu sampai DOM selesai loading
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createToggleButton);
      } else {
        createToggleButton();
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: scriptContent }} />;
};

export default ClientOnlyScript;
