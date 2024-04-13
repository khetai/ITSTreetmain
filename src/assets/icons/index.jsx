const Az_flag = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600">
    <path fill="#3f9c35" d="M0 0h1200v600H0z" />
    <path fill="#ed2939" d="M0 0h1200v400H0z" />
    <path fill="#00b9e4" d="M0 0h1200v200H0z" />
    <circle cx="580" cy="300" r="90" fill="#fff" />
    <circle cx="600" cy="300" r="75" fill="#ed2939" />
    <path
      d="M680 250l9.567 26.903 25.788-12.258-12.258 25.788L730 300l-26.903 9.567 12.258 25.788-25.788-12.258L680 350l-9.567-26.903-25.788 12.258 12.258-25.788L630 300l26.903-9.567-12.258-25.788 25.788 12.258L680 250z"
      fill="#fff"
    />
  </svg>
)

const Eng_flag = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30">
    <clipPath id="a">
      <path d="M0 0v30h60V0z" />
    </clipPath>
    <clipPath id="b">
      <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
    </clipPath>
    <g clip-path="url(#a)">
      <path d="M0 0v30h60V0z" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6" />
      <path
        d="M0 0l60 30m0-30L0 30"
        clip-path="url(#b)"
        stroke="#C8102E"
        stroke-width="4"
      />
      <path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6" />
    </g>
  </svg>
)

const Ru_flag = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6">
    <path fill="#fff" d="M0 0h9v3H0z" />
    <path fill="#DA291C" d="M0 3h9v3H0z" />
    <path fill="#0032A0" d="M0 2h9v2H0z" />
  </svg>
)

export { Az_flag, Eng_flag, Ru_flag }
