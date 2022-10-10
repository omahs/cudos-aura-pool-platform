import { Role } from '../roles';

export interface UserInterface {
  id: number;
  email: string;
  salt: string;
  hashedPass: string;
  role: Role;
  cudos_address: string;
  payout_address: string;
}
