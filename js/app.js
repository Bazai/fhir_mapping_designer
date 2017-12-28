const url = "https://coursehunters.net/course/geekbrains-wordpress";

const formObjectTemplate = {
  firstName: "Ivan",
  lastName: "Ivanov",
  phone: "+79611234567",
  birthDate: "10.12.1997"
};

const mappingTemplate = {
  mapping: [
    {
      fhir: ["resourceType"],
      fhir_const: "Encounter"
    },
    {
      fhir: ["type", 0, "coding", 0],
      form: ["type"]
    },
    {
      fhir: ["id"],
      form: ["id"]
    },
    {
      fhir: ["reason", 0, "text"],
      form: ["reason"]
    },
    {
      fhir: ["participant", 0, "type", 0],
      fhir_const: "ADMITTER"// ADMITTER
    },
    {
      fhir: ["participant", 0, "individual", "reference"],
      form: ["physician", "reference"]
    },
    {
      fhir: ["participant", 0, "individual", "display"],
      form: ["physician", "display"]
    },
    {
      fhir: ["serviceProvider", "display"],
      form: ["facility"]
    },
    {
      fhir: ["status"],
      form: ["status"],
      to_fhir: v => {
        if (v === true) {
          return "in-progress";
        }
        return "finished";
      },
      to_form: v => {
        return v === "in-progress";
      }
    },
    {
      fhir: ["period", "start"],
      form: ["admissionDate"],
      // to_fhir: DateFormat.form2fhir,
      // to_form: DateFormat.fhir2form
    },
    {
      fhir: ["period", "end"],
      form: ["dischargeDate"],
      // to_fhir: DateFormat.form2fhir,
      // to_form: DateFormat.fhir2form
    },
    {
      // fhir: ["extension", anticipatedDischargeDateEx, "valueDate"],
      fhir: ["extension", "anticipatedDischargeDateEx", "valueDate"],
      form: ["anticipatedDischargeDate"],
      // to_fhir: DateFormat.form2fhir,
      // to_form: DateFormat.fhir2form
    }
  ]
};

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

console.log('message', JSON.stringify(formObjectTemplate, null, 2));
const app = new Vue({
  el: "#app",
  data: {
    links: {
      loading: false,
      data: []
    },
    url: "https://coursehunters.net/course/geekbrains-wordpress",
    formObject: JSON.stringify(formObjectTemplate, null, 2),
    mapperConfig: JSON.stringify(mappingTemplate, null, 2),
    fhirObject: JSON.stringify(formObjectTemplate, null, 2)
  },
  methods: {
    getData() {
      this.links.loading = true;
      this.links.data = [{foo: "bar"}];
    }
  }
});