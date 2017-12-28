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

console.log('message', JSON.stringify(formObjectTemplate, null, 2));
const app = new Vue({
  el: "#app",
  data: {
    formObject: JSON.stringify(formObjectTemplate, null, 2),
    mapperConfig: JSON.stringify(mappingTemplate, null, 2),
    fhirObject: JSON.stringify(formObjectTemplate, null, 2),
    test: "hi"
  },
  watch: {
    formObject: function(val) {
      const result = JSON.stringify(val, null, 2);
      this.fhirObject = val;
    }
  },
  methods: {
    getData() {
      this.links.loading = true;
      this.links.data = [{foo: "bar"}];
    },
    foo(data) {
      console.log("dddddddddd", data);
    }
  }
});