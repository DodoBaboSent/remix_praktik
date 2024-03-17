import { NodeOnDiskFile } from "@remix-run/node";
import { db } from "./db.server";

export function validateType(type: string) {
  switch (type) {
    case "lic":
      return null;
    case "leg":
      return null;
    case "cat":
      return null;
    case "pay":
      return null;
    case "raz":
      return null;
    case "nop":
      return null;
    default:
      return "Такого типа не существует.";
  }
}

export function validateFile(file_file: NodeOnDiskFile) {
  if (file_file == null) {
    return "Отсутствует файл изображения";
  }
}

export function validateName(name: string) {
  if (name.length <= 3) {
    return "Имя должно быть больше 3 символов";
  }
}

export function validateQuant(quant: string) {
  if (Number(quant) == 0) {
    return "Количество не может быть равно нулю";
  }
  if (typeof Number(quant) !== "number") {
    return "Количество должно быть числом";
  }
}
