import axios from "axios";

export const userRegister = async (
  email: string,
  password: string,
  name: string,
  username: string,
  age: string,
  tel: string,
  gender: string,
  userAgent?: string
) => {
  try {
    console.log("Registrando usuario...intentando llmar al back");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}/users/register`,
      {
        email,
        password,
        name,
        username,
        age,
        tel,
        gender,
      },
      {
        headers: {
          "user-agent": userAgent,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response, "resultado de la peticion");
    if (response.statusText === "success" || response.status == 201) {
      return {
        response: {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
        },
        request: response.request.status,
      };
    }
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      return {
        response: {
          status: statusCode,
          statusText: error.response?.statusText,
          data:
            statusCode === 409
              ? error.response?.data.message
              : error.response?.data.message.message,
        },
        request: error.request.status,
      };
    }
  }
};
