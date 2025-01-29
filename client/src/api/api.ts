import axios from "axios";
import url from "./server-connect";

export const resetPassword = async (data: {
  email: string;
  resetCode: string;
  newPassword: string;
}) => {
  const response = await axios.post(`${url}/resetPassword`, {
    email: data.email,
    resetCode: data.resetCode,
    newPassword: data.newPassword,
  });

  return response.data;
};

export const checkEmail = async (email: string) => {
    try {
      await axios.post(`${url}/checkEmailExists`, { email });
      return true;
    } catch {
      return false;
    }
  };

  export const postCommand = async (data: {
    postName: string;
    postContent: string;
  }) => {
    const response = await axios.post(`${url}/CommandPost`, data,{
      params: {
        useCookies: true,
      },
      withCredentials: true,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };

  export const downloadPosts = async () => {
    try {
      const response = await axios.get(`${url}/CommandPost/download`, {
        params: {
          useCookies: true,
        },
        withCredentials: true,
        responseType: 'blob', 
        headers: {
          accept: "application/json",
        },
      });

      const blob = new Blob([response.data], { type: 'text/plain' });
  
      const downloadUrl = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'commands.txt'; 
      document.body.appendChild(a);
      a.click();
  
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
      
    } catch (error) {
      console.error('Error downloading command posts:', error);
      alert('Failed to download the file. Please try again.');
    }
  };


  export const deleteCommand = async (id) => {
    try {
      const response = await axios.delete(`${url}/CommandPost/${id}`, {
        params: {
          useCookies: true,
        },
        withCredentials: true,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error)
    }
  };

  export const updateCommand = async (data: {
    id: string;
    userId: string;
    postName: string;
    postContent: string;
  }) => {
    const { id } = data; 
    const response = await axios.put(`${url}/CommandPost/${id}`, data, {
      params: {
        useCookies: true,
      },
      withCredentials: true,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };


  export const getAllCommands = async () => {
    const response = await axios.get(`${url}/CommandPost`, {
      params: {
        useCookies: true,
      },
      withCredentials: true,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  };

  export const getUserData = async () => {
    const response = await axios.get(`${url}/CommandPost/current-posts-user`, {
      params: {
        useCookies: true,
      },
      withCredentials: true,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  };



  export const postRegister = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    terms: boolean;
  }) => {
    const response = await axios.post(`${url}/register`, data);
    return response.data;
  };

  export const postLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${url}/login`, data, {
        params: {
          useCookies: true,
        },
        withCredentials: true,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response.data;
    }catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            throw new Error("INVALID_CREDENTIALS"); 
          } else if (status === 403) {
            throw new Error("ACCOUNT_NOT_CONFIRMED"); 
          } else if (status === 429) {
            throw new Error("Too many login attempts. Please wait a moment and try again."); 
          } else {
            throw new Error("GENERAL_ERROR"); 
          }
        } else {
          throw new Error("An unexpected error occurred. Please check your connection and try again."); 
        }
      } else {
        throw new Error("UNEXPECTED_ERROR"); 
      }
    }
  };

  export const postLogout = async () => {
    const response = await axios.post(
      `${url}/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  };


  export const sendResetPasswordEmail = async (data: { email: string }) => {
    const emailRequest = {
      email: data.email,
    };
    const response = await axios.post(`${url}/forgotPassword`, emailRequest);
    return response.data;
  };
  
