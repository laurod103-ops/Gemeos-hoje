// ═══ PWA ═══
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('sw.js').catch(e=>console.log('SW erro:',e));
  });
}
let deferredPrompt;
window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault();deferredPrompt=e;
  const b=document.getElementById('installBanner');if(b)b.style.display='flex';
});
function instalarApp(){
  if(!deferredPrompt)return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(()=>{deferredPrompt=null;fecharBanner();});
}
function fecharBanner(){
  const b=document.getElementById('installBanner');if(b)b.style.display='none';
}
function abrirPrivacidade(){
  // Remove qualquer overlay antigo
  const velho=document.getElementById('overlayPriv');
  if(velho)velho.remove();

  const conteudo=document.getElementById('modalPrivacidade').innerHTML;

  const overlay=document.createElement('div');
  overlay.id='overlayPriv';
  overlay.style.cssText='position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(2,4,8,.98);z-index:2147483647;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:1.5rem 1rem 5rem;';
  overlay.innerHTML=conteudo;
  document.documentElement.appendChild(overlay);
  overlay.scrollTop=0;
}
function fecharPrivacidade(){
  const overlay=document.getElementById('overlayPriv');
  if(overlay)overlay.remove();
}
</script>
