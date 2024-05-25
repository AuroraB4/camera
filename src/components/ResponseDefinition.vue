<template>
<div class="containerResponse">
  <div class="header">
    <div id="responseTitle">TITLE</div>
    <div id="responseSubTitle">message</div>
  </div>
  <div id="horizontal-line"></div>
  <div class="content">
      <div style="color: #707070;">
        <b>Version: </b> validityDate
      </div>
      <div style="color: #707070;">
        <b>Eurovoc: </b> keywords
      </div>
      <div style="color: #707070;">
        <b>Score:</b> score
      </div>
    </div>
</div>
</template>
<script setup>
</script>

<style>
.containerResponse {
  background-color:#DCDCDC;
  border-radius:5pt;
  width: 400px;
  margin-top:15px;
  outline: 1px solid #4E4E4E;
  color:#4E4E4E;
  display: grid;
  margin-left: auto; /* Centrato orizzontalmente rispetto al genitore */
  margin-right: auto; /* Centrato orizzontalmente rispetto al genitore */
  max-width:300px;
}
.header{
  margin:10px;
  font-weight:bold;
  max-width:300px;
}
.content{
  margin:10px;
  font-size: 11px;
  max-width:300px;
}
#responseTitle{
  font-size:14px;
  max-width:300px;
}
#responseSubtitle{
  font-size:13px;
  max-width:300px;
}
#horizontal-line{
  outline: 0.1px solid #4E4E4E;
  margin-bottom:5px;
  max-width:300px;
}
</style>