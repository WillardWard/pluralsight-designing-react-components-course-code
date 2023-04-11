function withData(Component) {
  const speakers = [
    { imageSrc: "speaker-1124", name: "Douglas Crockford" },
    { imageSrc: "speaker-1530", name: "Tamara Baker" },
    { imageSrc: "speaker-10803", name: "Eugene Chuvyrov" },
  ];
  return function () {
    return <Component speakers={speakers}></Component>;
  };
}

export default withData;
