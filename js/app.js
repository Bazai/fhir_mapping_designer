const split = window.Split;

const formObjectTemplate = {
  "firstname": "",
  "lastname": "",
  "phone": "",
  "email": "",
  "birthdate": "",
  "gender": "",
};

const patientMappingTemplate = `[
  {
    fhir: ["resourceType"],
    fhir_const: "Patient"
  },
  {
    fhir: ["name", {use: "official"}, "given", 0],
    form: [""]
  },
  {
    fhir: ["name", {use: "official"}, "family", 0],
    form: [""]
  },
  {
    fhir: ["gender"],
    form: [""]
  },
  {
    fhir: ["telecom", { "use":"home", "system":"phone" }, "value"],
    form: [""]
  },
  {
    fhir: ["telecom", { "system":"email" }, "value"],
    form: [""]
  },
  {
    fhir: ["birthDate"],
    form: [""]
  }
];`;

const personMappingTemplate = `[
  {
    fhir: ["resourceType"],
    fhir_const: "Person"
  },
  {
    fhir: ["name", {use: "official"}, "given", 0],
    form: [""]
  },
  {
    fhir: ["name", {use: "official"}, "family", 0],
    form: [""]
  },
  {
    fhir: ["gender"],
    form: [""]
  }
];`;

const templates = {
  patient: patientMappingTemplate,
  person: personMappingTemplate
};

Vue.use(VueCodemirror);
const app = new Vue({
  el: "#app",
  data: {
    formObject: JSON.stringify(formObjectTemplate, null, 2),
    mapperConfig: patientMappingTemplate,
    fhirObject: JSON.stringify(formObjectTemplate, null, 2),
    mappingTemplate: null,
    cmOption: {
      tabSize: 4,
      styleActiveLine: true,
      lineNumbers: true,
      mode: 'text/javascript',
      scroll: true
    },
  },
  watch: {
    formObject: function (val) {
      const mapper = eval(this.mapperConfig.length > 0 ? this.mapperConfig : "[]");
      const form = JSON.parse(val.length > 0 ? val : "{}");
      const result = Mapper.formToFhir(form, mapper);
      this.fhirObject = result;
    },
    mapperConfig: function (val) {
      const mapper = eval(val.length > 0 ? val : "[]");
      const form = JSON.parse(this.formObject.length > 0 ? this.formObject : "{}");
      const result = Mapper.formToFhir(form, mapper);
      this.fhirObject = result;
    },
    mappingTemplate: function (val) {
      this.mapperConfig = templates[val.toLowerCase()];
    }
  }
});

split(['#form', '#mapping', '#fhir'], {
  gutterSize: 20,
  elementStyle: function (dimension, size, gutterSize) {
    return {
      'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)'
    }
  },
  gutterStyle: function (dimension, gutterSize) {
    return {
      'flex-basis':  gutterSize + 'px'
    }
  }
})