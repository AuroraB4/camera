<template>
  <div class="app">
    <div class="search-section">
      <div class="component-wrapperSearch">
        <div class="v-alignedSearch">
          <input
            class="input"
            id="term"
            type="text"
            v-model="inputTerm"
            placeholder="Enter a term..."
            :class="{ warn: inputAlertVisible }"
          />

          <button
            type="button"
            @click="submitRequest('definition')"
            class="search-button"
          >
            Definition suggestion
          </button>
          <button
            type="button"
            @click="submitRequest('reference')"
            class="search-button"
          >
            Reference suggestion
          </button>
          <div id="alert" v-if="inputAlertVisible || eurovocAlertVisible">
            {{ alert }}
          </div>
        </div>

        <div class="v-aligned">
          <input class="datepicker" type="date" v-model="selectedDate" />
          <div
            :class="{
              inputEurovocContainer: true,
              active: inputEurovocs.length > 0 && eurovocInputFocused,
              warn: eurovocAlertVisible,
            }"
          >
            <input
              id="eurovocInput"
              type="text"
              v-model="inputEurovoc"
              placeholder="Enter an eurovoc..."
              @focus="eurovocInputFocused = true"
              @blur="eurovocInputFocused = false"
            />
            <button id="add-button" @click="addEurovoc">+</button>
          </div>
          <div v-if="inputEurovocs.length > 0">
            <div
              class="eurovocs"
              v-for="(eurovoc, index) in inputEurovocs"
              :key="index"
            >
              {{ eurovoc }}
              <button id="add-button" @click="removeEurovoc(index)">x</button>
            </div>
          </div>
        </div>
        <div class="v-aligned checkboxes">
          <div>
            <input
              type="radio"
              id="leosCh"
              name="repository"
              value="leos"
              checked
            />
            <label for="huey">LEOS</label>
          </div>
          <div>
            <input
              type="radio"
              id="normattivaCh"
              name="repository"
              value="normattiva"
            />
            <label for="normattivaCh">Normattiva</label>
          </div>
          <div>
            <input
              type="radio"
              id="ddlCameraCh"
              name="repository"
              value="ddlCamera"
            />
            <label for="ddlCameraCh">DDL Camera</label>
          </div>
        </div>
      </div>
    </div>
    <div class="results">
      <Request
        v-if="requestVisible"
        :term="requestTerm"
        :eurovocs="requestEurovocs"
        :date="requestDate"
      />
      <ResponseDefinition v-if="requestVisible" />
      <ResponseReference v-if="requestVisible" />
      <ResponseReference v-if="requestVisible" />
      <ResponseDefinition v-if="requestVisible" />
      <ResponseReference v-if="requestVisible" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Request from "./components/Request.vue";
import ResponseDefinition from "./components/ResponseDefinition.vue";
import ResponseReference from "./components/ResponseReference.vue";

let eurovocInputFocused = ref(false);
let inputTerm = ref("");
let inputEurovoc = ref("");
let selectedDate = ref(new Date().toISOString().split("T")[0]);
let inputEurovocs = ref([]);
let alert = ref("");
let inputAlertVisible = ref(false);
let eurovocAlertVisible = ref(false);

let requestTerm = ref("");
let requestEurovocs = ref([]);
let requestDate = ref("");
let requestVisible = ref(false);

const regex = /[^\w()]/;
const url = "http://u2.cirsfid.unibo.it/py/";

const addEurovoc = () => {
  eurovocAlertVisible.value = false;
  if (inputEurovoc.value.trim() !== "") {
    if (!regex.test(inputEurovoc.value.trim())) {
      inputEurovocs.value.push(inputEurovoc.value.trim());
      inputEurovoc.value = "";
    } else {
      alert.value = "Eurovocs can't contain special characters";
      eurovocAlertVisible.value = true;
    }
  } else {
    alert.value = "You cannot add an empty eurovoc";
    eurovocAlertVisible.value = true;
  }
};

const removeEurovoc = (index) => {
  inputEurovocs.value.splice(index, 1);
};

const submitRequest = (type) => {
  requestVisible.value = false;
  inputAlertVisible.value = false;
  eurovocAlertVisible.value = false;
  if (!regex.test(inputTerm.value.trim())) {
    if (inputTerm.value.trim() !== "") {
      if (type === "definition") {
        requestVisible.value = true;
        const uri = url + "leos-prompter/suggest";
        requestTerm.value = inputTerm.value.trim();
        requestEurovocs.value = [...inputEurovocs.value];
        requestDate.value = formatDate(selectedDate.value);
        const requestBody = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: {
            term: requestTerm.value,
            eurovoc: requestEurovocs.value,
            date: requestDate.value,
          },
        };
        fetch(uri, requestBody)
          .then((response) => console.log(response))
          .then((data) => console.log(data));
      } else if (type === "reference") {
        if (inputEurovocs.value.length === 0) {
          alert.value = "You need at least 1 eurovoc to look for references";
          eurovocAlertVisible.value = true;
          requestVisible.value = false;
        } else {
          requestVisible.value = true;
          requestTerm.value = inputTerm.value.trim();
          requestEurovocs.value = [...inputEurovocs.value];
          requestDate.value = formatDate(selectedDate.value);
          const uri = url + "leos-prompter/suggest";
          const requestBody = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: {
              reference: inputTerm.value,
              keywords: inputEurovocs.value,
              date: requestDate.value,
            },
          };
          fetch(uri, requestBody)
            .then((response) => console.log(response))
            .then((data) => console.log(data));
        }
      }
    } else {
      alert.value = "You cannot search for an empty term";
      inputAlertVisible.value = true;
      requestVisible.value = false;
    }
  } else {
    alert.value = "Term can't contain special characters";
    inputAlertVisible.value = true;
    requestVisible.value = false;
  }
};
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}/${month}/${day}`;
};
</script>

<style>
.component-wrapperSearch {
  display: flex;
  align-items: flex-start;
  width: 600px;
  height: auto;
  justify-content: center;
}
.results {
  display: grid;
  align-items: flex-start;
  width: 400px;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  overflow-y: auto;
}
.v-alignedSearch {
  display: grid; /* Use Grid Layout for child elements */
}

.datepicker {
  margin-left: 5px;
  margin-top: 5px;
  padding: 5px 10px;
  border: thin solid lightgray;
  border-radius: 5px;
  color: gray;
  width: 100%;
  box-sizing: border-box;
}

.datepicker:focus {
  outline: 1px solid gray;
}

.input {
  width: 200px;
  padding: 5px 10px;
  border: thin solid lightgray;
  border-radius: 5px;
  color: gray;
  /* width: 100%;*/
  box-sizing: border-box;
}
.input:focus-within {
  outline: 1px solid gray;
}

.search-button {
  width: 200px;
  padding: 5px 10px;
  margin-top: 5px;
  /* width: 100%;*/
  background: white;
  border: thin solid lightgray;
  border-radius: 5px;
  color: gray;
}
.search-button:hover {
  outline: 1px solid gray;
  background-color: #dcdcdc;
}
.search-button:focus {
  outline: 1px solid #dcdcdc;
  color: #dcdcdc;
  background-color: gray;
}

#term {
  padding: 7px;
  padding-right: 30px;
  background: white url("https://www.svgrepo.com/show/532555/search.svg")
    no-repeat calc(100% - 10px) center;
  background-size: 15px 15px;
}
.inputEurovocContainer {
  padding: 0px;
  margin-left: 5px;
  border: thin solid lightgray;
  border-radius: 5px;
  margin-top: 5px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center; /* Aggiunto per allineare verticalmente */
  justify-content: space-between;
}
#eurovocInput {
  border: none;
  outline: none;
  margin: 4px;
}
#add-button {
  border: none;
  background-color: inherit;
  padding: 0; /* Remove default padding */
  margin-right: 5px; /* Remove default margin */
  width: auto; /* Adjust width to fit content */
}
#add-button:hover {
  font-weight: bolder;
}

.inputEurovocContainer:focus-within {
  outline: 1px solid gray;
}
.inputEurovocContainer.active {
  outline: 1px solid gray;
}
.eurovocs {
  align-items: center;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-top: 2px;
  margin-bottom: 2px;
  margin-left: 15px;
  border-radius: 4px;
}
.eurovocs:hover {
  background-color: #eeeeee;
}
#alert {
  margin-left: 15px;
  margin-top: 5px;
  color: red;
  font-size: 11px;
  width: 180px;
}
.app {
  width: 700px;
}
.warn {
  border: 1px solid red;
}
.search-section {
  top: 0;
  left: 0;
  width: 100%; /* Assicura che l'elemento fisso si estenda per tutta la larghezza del contenitore */
  position: sticky;
  padding-bottom: 10px;
  background-color: white;
}
.checkboxes {
  margin-top: 5px;
  font-size: 13px;
}
</style>
