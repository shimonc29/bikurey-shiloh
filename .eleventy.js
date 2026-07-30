const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  // מנוע מרקדאון לרינדור טקסטים עשירים (הדגשות וכו')
  const md = new markdownIt({ html: true, breaks: true, linkify: true });

  // פילטר לפסקאות שלמות (עוטף ב־<p>)
  eleventyConfig.addFilter("md", (str) => (str ? md.render(String(str)) : ""));

  // פילטר לטקסט בשורה אחת (בלי עטיפת <p>) — לפריטי רשימה
  eleventyConfig.addFilter("mdInline", (str) =>
    str ? md.renderInline(String(str)) : ""
  );

  // העתקת קבצים סטטיים כמו שהם אל הפלט
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/script.js");
  eleventyConfig.addPassthroughCopy("src/admin");

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data",
    },
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk",
  };
};
