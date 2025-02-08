import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class ContactFormDTO {
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString({ message: "El nombre debe ser un texto" })
  name: string;

  @IsNotEmpty({ message: "El email es obligatorio" })
  @IsEmail({}, { message: "El email no es válido" })
  email: string;

  @IsNotEmpty({ message: "El teléfono es obligatorio" })
  @Matches(/^\d+$/, { message: "El teléfono solo debe contener números" })
  phone: string;

  @IsNotEmpty({ message: "El mensaje es obligatorio" })
  @IsString({ message: "El mensaje debe ser un texto" })
  message: string;
}
