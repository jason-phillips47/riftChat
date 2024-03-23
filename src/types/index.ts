export interface UserData {
    email: string | null;
    password?: string;
    username: string;
    uid?: string;
    available: boolean;
  }
  
  export interface AuthUser {
    uid: string;
    email: string | null;
  }
  
  