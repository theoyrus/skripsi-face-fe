import "./login.form.scss"
import wave from "@/apps/auth/assets/img/wave.png"
import bg from "@/apps/auth/assets/img/bg.svg"
import avatar from "@/apps/auth/assets/img/avatar.svg"
import { SyntheticEvent, useRef } from "react"
import { AuthService } from "../../services/auth.service"
import { useNavigate } from "react-router-dom"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"

interface IFormLogin {
  email: string
  password: string
}

export const LoginFormSimple = () => {
  const navigation = useNavigate()
  const { register, handleSubmit, control } = useForm<IFormLogin>()
  const inputRefs = useRef<HTMLInputElement[]>([])
  const addcl = (index: number) => {
    const elm = inputRefs.current[index]
    const parent = elm.parentNode?.parentNode as HTMLElement
    if (parent) parent.classList.add("focus")
  }

  const remcl = (index: number) => {
    const elm = inputRefs.current[index]
    const parent = elm.parentNode?.parentNode as HTMLElement
    if (elm.value === "") {
      parent.classList.remove("focus")
    }
  }

  const handleInputRef = (element: HTMLInputElement, index: number) => {
    inputRefs.current[index] = element
  }

  const SignIn: SubmitHandler<IFormLogin> = (data) => {
    AuthService.login(data.email, data.password)
      .then(() => {
        navigation("/app", { replace: true })
      })
      .catch(() => {
        toast.error("Autentikasi salah, mohon cek identitas yg Anda isi")
      })
  }

  const handleSignIn = (event: SyntheticEvent) => {
    event.preventDefault()
    let email = inputRefs.current[0].value
    AuthService.login(email, "b")
      .then(() => {
        navigation("/app", { replace: true })
      })
      .catch(() => {
        toast.error("Autentikasi salah, mohon cek identitas yg Anda isi")
      })
  }

  return (
    <div className="loginsimple">
      <img className="wave" src={wave} />
      <div className="container">
        <div className="img">
          <img src={bg} />
        </div>
        <div className="login-content">
          {/* <form onSubmit={handleSignIn}> */}
          <form onSubmit={handleSubmit(SignIn)}>
            <img src={avatar} />
            <h2 className="title">Selamat Datang!</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user" />
              </div>
              <div className="div">
                <h5>Email</h5>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      required
                      type="email"
                      className="input"
                      key={1}
                      ref={(element: HTMLInputElement) =>
                        handleInputRef(element, 1)
                      }
                      onFocus={() => addcl(1)}
                      onBlur={() => remcl(1)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock" />
              </div>
              <div className="div">
                <h5>Password</h5>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      name="password"
                      required
                      type="password"
                      className="input"
                      key={2}
                      ref={(element: HTMLInputElement) =>
                        handleInputRef(element, 2)
                      }
                      onFocus={() => addcl(2)}
                      onBlur={() => remcl(2)}
                    />
                  )}
                />
              </div>
            </div>
            <input type="submit" className="btn" defaultValue="Login" />
          </form>
        </div>
      </div>
    </div>
  )
}
