<template>
  <div class="google-btn">
    <div class="google-icon-wrapper">
      <img
        class="google-icon"
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
      />
    </div>
    <p class="btn-text"><b>Sign in with google</b></p>
  </div>
</template>

<style lang="scss" scoped>
$white: #fff;
$google-blue: #4285f4;
$button-active-blue: #1669f2;

.google-btn {
  background-color: $google-blue;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  height: 42px;
  width: 184px;

  .google-icon-wrapper {
    background-color: $white;
    margin-left: 1px;
    border-radius: 2px;
    height: 40px;
    margin-top: 1px;
    width: 40px;
    position: absolute;
  }

  .google-icon {
    height: 18px;
    margin-left: 11px;
    margin-top: 11px;
    position: absolute;
    width: 18px;
  }

  .btn-text {
    color: $white;
    float: right;
    font-family: Roboto;
    font-size: 14px;
    letter-spacing: 0.2px;
    margin: 11px 11px 0 0;
  }

  &:hover {
    box-shadow: 0 0 6px $google-blue;
  }

  &:active {
    background: $button-active-blue;
  }
}

@import url('https://fonts.googleapis.com/css?family=Roboto:500');
</style>
