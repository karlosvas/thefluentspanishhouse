import "../styles/footer.css";

function Footer() {
  return (
    <>
      <footer>
        <section>
          <a href="mailto:mar411geca@gmail.com" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svgIcons"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z" />
              <path d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z" />
            </svg>
            mar411geca@gmail
          </a>
          <a href="tel:+34617286125" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="svgIcons"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            +34617286125
          </a>
          <a
            href="https://www.facebook.com/share/pvGozQ6PhZwUWdma/"
            target="_blank"
          >
            <svg
              href=""
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              className="svgIcons"
              viewBox="0 0 50 50"
              fill="currentColor"
            >
              <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M37,19h-2c-2.14,0-3,0.5-3,2 v3h5l-1,5h-4v15h-5V29h-4v-5h4v-3c0-4,2-7,6-7c2.9,0,4,1,4,1V19z"></path>
            </svg>
            The Fluent Spanish House
          </a>
        </section>
        <section>
          © 2024 The Fluent Spanish House. Todos los derechos reservados.
        </section>
        {window.innerWidth >= 766 && (
          <section>
            <nav>
              <a href="/info" target="_blank">
                Terms and Conditions
              </a>{" "}
              <br />
              <a href="/info" target="_blank">
                Privacy Policy
              </a>
            </nav>
          </section>
        )}
      </footer>
    </>
  );
}

export default Footer;
