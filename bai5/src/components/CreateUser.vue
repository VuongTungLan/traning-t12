<template>
  <el-form
    :model="numberValidateForm"
    ref="numberValidateForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item
      label="Id"
      prop="id"
      :rules="[
        { required: true, message: 'id is required' },
        { type: 'number', message: 'id must be a number' },
      ]"
    >
      <el-input
        type="id"
        v-model.number="numberValidateForm.id"
        autocomplete="off"
      ></el-input>
    </el-form-item>
<el-form-item
      label="User name"
      prop="username"
      :rules="[
        { required: true, message: 'user name is required' },
      ]"
    >
      <el-input
        type="username"
        v-model.number="numberValidateForm.username"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('numberValidateForm')"
        >Submit</el-button
      >
      <el-button @click="resetForm('numberValidateForm')">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      numberValidateForm: {
        id: "",
        username: ""
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('addUser', {
              id: this.numberValidateForm.id,
              username: this.numberValidateForm.username
          })
          this.$router.push('/home')
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
