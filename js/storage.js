/* ============================================================
   STORAGE.JS
   Capa de persistencia de TrustPay.
   Aquí centralizamos cómo se guardan y leen los datos
   (pedidos, negocio seleccionado, etc).

   NOTA IMPORTANTE PARA VS CODE / NAVEGADOR NORMAL:
   En tu navegador normal (fuera de Claude.ai) localStorage
   funciona perfecto, así que esta capa usa localStorage.
   Si en algún momento corres esto DENTRO de un artifact de
   Claude.ai, avísame y cambiamos esta capa por window.storage
   sin tocar el resto del código (por eso está aislado aquí).
   ============================================================ */

const TrustPayStorage = (() => {
  const NAMESPACE = 'trustpay';

  function _key(key){
    return `${NAMESPACE}:${key}`;
  }

  function set(key, value){
    try{
      localStorage.setItem(_key(key), JSON.stringify(value));
      return true;
    }catch(err){
      console.error('TrustPayStorage.set error:', err);
      return false;
    }
  }

  function get(key, fallback = null){
    try{
      const raw = localStorage.getItem(_key(key));
      if(raw === null) return fallback;
      return JSON.parse(raw);
    }catch(err){
      console.error('TrustPayStorage.get error:', err);
      return fallback;
    }
  }

  function remove(key){
    localStorage.removeItem(_key(key));
  }

  return { set, get, remove };
})();