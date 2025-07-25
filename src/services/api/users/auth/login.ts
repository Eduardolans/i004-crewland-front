// import axios from "axios";

// export const userRegister = async (email: string, password: string, name: string) => {
//     try {
//         const response = await axios.post(
//             `${process.env.NEXT_PUBLIC_SERVER}/auth/register`,
//             {
//                 email,
//                 password,
//                 name
//             }
//         );
//         return response.data;
//     } catch (e) {
//         console.error(e);
//     }
// };

import axios from "axios";

export const userLogin = async (
  email: string,
  password: string,
  name: string,
  userAgent?: string
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/login`,
      {
        email,
        password,
        name,
      },
      {
        headers: {
          "user-agent": userAgent,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.statusText === "success" || response.status === 200) {
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
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      return {
        response: {
          status: statusCode,
          statusText: error.response?.statusText,
          data:
            statusCode === 401
              ? error.response?.data.message
              : error.response?.data.message?.message || "Error desconocido.",
        },
        request: error.request?.status,
      };
    }
  }
};
