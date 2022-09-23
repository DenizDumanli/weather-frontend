<template>
  <div class="container">
    <h1 class="text-center">Weather Infos</h1>
    <div class="input-area">
      <h2>Call Weather Data Frequency in Seconds</h2>
      <input type="number" v-model="myInput" />
    </div>
    <table class="table table-stripped">
      <thead class="table-head">
        <th>Country</th>
        <th>City</th>
        <th>Temperature</th>
        <th>Datetime</th>
      </thead>
      <tbody>
        <tr>
          <td>{{ infos.country }}</td>
          <td>{{ infos.cityName }}</td>
          <td>{{ infos.temp }}</td>
          <td>{{ infos.dt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import geoService from "../services/geoService";
export default {
  name: "Infos",
  data() {
    return {
      infos: [],
      myInput: [],
      interval: [],
    };
  },
  methods: {
    getInfos() {
      return setInterval(() => {
        axios.get("http://localhost:5000/country").then((response) => {
          this.infos = response.data;
          this.infos.dt = new Date(this.infos.dt);
        });
      }, this.myInput * 1000);
    },

    setOurInterval() {
      clearInterval(this.interval);
      this.interval = this.getInfos();
    },
  },
  watch: {
    myInput(newInput, oldInput) {
      if (newInput >= 1) {
        this.setOurInterval();
      }
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.input-area input {
  width: 100%;
  border-radius: 8px;
  outline: none;
  border: none;
  padding: 0.4rem;
}

.table {
  width: 60%;
}

.table * {
  text-align: center;
}

.table th,
.table td {
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.table-head th {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
