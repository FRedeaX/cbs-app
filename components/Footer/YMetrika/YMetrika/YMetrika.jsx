import Script from "next/script";

export const YMetrika = () =>
  process.env.NODE_ENV === "production" ? (
    <>
      <Script>
        {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(33186213, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            }
          )`}
      </Script>
      <a
        href="https://metrika.yandex.ru/stat/?id=33186213&amp;from=informer"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: "10px", color: "initial" }}
      >
        <img
          src="https://informer.yandex.ru/informer/33186213/3_1_FFFFFFFF_EFEFEFFF_0_pageviews"
          style={{
            width: "88px",
            height: "31px",
            border: 0,
            borderRadius: 0,
          }}
          alt="Яндекс.Метрика"
          title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)"
          className="ym-advanced-informer skip"
          data-cid="33186213"
          data-lang="ru"
        />
      </a>
    </>
  ) : null;
