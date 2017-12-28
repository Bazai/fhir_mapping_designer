const jsBeautify = window.js_beautify;
console.log(jsBeautify);

const formObjectTemplate = {
  "firstName": "Ivan",
  "lastName": "Ivanov",
  "phone": "+79611234567",
  "email": "mail@mail.com",
  "birthdate": "10.12.1997",
  "gender": "male",
};

// const _fhirDate = (date, fromFormat) => {
//   const a = moment(date, fromFormat).format(FHIR_DATE);
//   return a;
// };

const formDate2fhirDate = a => a;
// TODO: copy
//   const b = _fhirDate(a);
//   return b;
// };

const fhirDate2formDate = a => a;
// {
//   // TODO: copy
//   const b = _fhirDate(a);
//   return b;
// };


const mappingTemplate = `[
  {
    fhir: ["resourceType"],
    fhir_const: "Patient"
  },
  {
    fhir: ["name", {use: "official"}, "given", 0],
    form: ["firstName"]
  },
  {
    fhir: ["name", {use: "official"}, "family", 0],
    form: ["lastName"]
  },
  {
    fhir: ["gender"],
    form: ["gender"]
  },
  {
    fhir: ["telecom", { "use":"home", "system":"phone" }, "value"],
    form: ["phone"]
  },
  {
    fhir: ["telecom", { "system":"email" }, "value"],
    form: ["email"]
  },
  {
    fhir: ["birthDate"],
    form: ["birthdate"]
  }
];`;

const mappingTemplate2 = {
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

Vue.use(VueCodemirror);
const app = new Vue({
  el: "#app",
  data: {
    code: 'const a = 10',
    formObject: JSON.stringify(formObjectTemplate, null, 2),
    mapperConfig: mappingTemplate,
    fhirObject: JSON.stringify(formObjectTemplate, null, 2),
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
    }
  }
});
