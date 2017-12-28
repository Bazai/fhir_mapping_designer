const url = "https://coursehunters.net/course/geekbrains-wordpress";

const formObjectTemplate = {};

// const parseResponseVideos = body => {
//   let responseHTML = document.createElement("html");
//   responseHTML.innerHTML = body;
//
//   const inputs = responseHTML.querySelectorAll("#lessons-list li");
//
//   const items = Object.keys(inputs).map(element => {
//     let elementHTML = document.createElement("div");
//   elementHTML.innerHTML = inputs[element].innerHTML;
//   let item = elementHTML
//     .querySelector("link[itemprop=url]")
//     .getAttribute("href");
//   return item;
// });
//   return items;
// };

const app = new Vue({
  el: "#app",
  data: {
    links: {
      loading: false,
      data: []
    },
    url: "https://coursehunters.net/course/geekbrains-wordpress"
  },
  methods: {
    getData() {
      this.links.loading = true;
      this.links.data = [];
      this.links.data = [{foo: "bar"}];
    }
  }
});