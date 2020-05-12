<template>
  	<div class="login_page">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer">
			     <div class='titleArea rflex'>
					<img class="logo logoFlag" :src="logo" alt="新时空智能平台">
					<span class='title'>新时空计费系统</span>
				</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
					<el-form-item prop="username" class="login-item">
					    <span class="fa-tips"><i class="fa fa-user"></i></span>
						<el-input @keyup.enter.native ="submitForm('loginForm')"  class="area" type="text" placeholder="用户名" v-model="loginForm.username" ></el-input>
					</el-form-item>
					<el-form-item prop="password" class="login-item">
					    <span class="fa-tips"><i class="fa fa-lock"></i></span>
						<el-input @keyup.enter.native ="submitForm('loginForm')" class="area" type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item class="loginBtn">
				    	<el-button type="primary"  @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
				  	</el-form-item>
				</el-form>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
import {api} from '../../config/api'
import logoImg from "@/assets/img/logo.png";

export default {
    data() {
        return {
            logo:logoImg,
            loginForm: {
                username: 'ntsitech',
                password: '123456'
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        showMessage(type,message){
            this.$message({
                type: type,
                message: message
            });
        },
        submitForm(loginForm) {
            this.$refs[loginForm].validate((valid) => {                
                if (valid) {
                    let userinfo = this.loginForm;
                    this.login(userinfo);
                }
            });
        },
        async login(userInfo) {
            let res = await api.login(userInfo);
            console.log(res);
            console.log(res.data)

            if(res.data.code == 0) {
                // this.$message({  // Element ui自带信息弹窗
                //     message: '登录成功',
                //     type: 'success'
                // });

                // 存入用户信息
                let userInfo= JSON.stringify(res.data.data);
                localStorage.setItem('userInfo',userInfo);
                this.$router.push('home')
            }else {
                this.$message.error(res.data.msg);
            }
        },

    }

};
</script>

<style lang="less">
    .login_page{
		position: absolute;
		width: 100%;
		height: 100%;
		background: url("../../assets/img/bg9.jpg") no-repeat center center;
		background-size: 100% 100%;
	}
	.form_contianer{
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -120px;
		transform: translate(-50%,-50%);
		background: #fff;
		width:370px;
		border-radius: 5px;
		padding: 25px;
		text-align: center;
		.titleArea{
			justify-content: center;
   			align-items: center;
			text-transform: uppercase;
            font-size: 22px;
            visibility: middle;
			width: 100%;
            padding-bottom: 20px;
			.logo{
				height: 40px;
                margin-right: 10px;
                vertical-align: middle;
			}
			.title{
				i{
				   color: #FF6C60;
				}
			}
		}
	
		.loginForm{
			.loginBtn {
				margin-top: 48px;
			}
			.submit_btn{
				width: 100%;
				padding:13px 0;
				font-size: 16px;
			}
			.fa-tips{
				position: absolute;
				left: 10px;
				z-index: 20;
				color: #FF7C1A;
				font-size: 18px;
				top: 50%;
				transform: translateY(-50%);
			}
	    }
	}

	.manage_tip{
		margin-bottom:20px;
		.title{
			font-family: cursive;
			font-weight: bold;
			font-size: 26px;
			color:#fff;
		}
		.logo{
			width:60px;
			height:60px;
		}
	}
	
	.tiparea{
		text-align:left;
		font-size: 12px;
		color: #4cbb15;
		padding: 10px 0;
		.tip{
			margin-left: 54px;
		}
		.tips{
			color:red;
		}
	}
	
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
	.loginForm{
		.el-button--primary{
			background-color:#FF7C1A;
			border:1px solid #FF7C1A;
		}
	}
	.sanFangArea{
		border-top: 1px solid #DCDFE6;
		padding: 10px 0;
		display: none;
		.title{
			font-size: 14px;
			color: #8b9196;
			margin-bottom: 10px;
		}
		ul{
			li{
				flex:1;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				.svg-icon{
					font-size: 24px;
				}
			}
		}
	}
</style>

