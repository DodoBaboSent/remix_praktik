import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const db = new PrismaClient();

async function seed() {
    const admin = await db.user.upsert({
        create: {
            username: "admin",
            // this is a hashed version of "twixrox"
            passwordHash: await bcrypt.hash("admin", 10),
            role: "master"
        },
        where: {
            username: "admin"
        },
        update: {
            username: "admin",
            // this is a hashed version of "twixrox"
            passwordHash: await bcrypt.hash("admin", 10),
            role: "master"
        }
    });


    const Leica = await db.tech.create({
        data: {
            name: "Leica GTX-1220",
            quant: 40,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Спутниковые геодезические приемники"
                    },
                    create: {
                        name: "Спутниковые геодезические приемники"
                    }
                }
            }
        }
    })
    const Javad = await db.tech.create({
        data: {
            name: "Javad Legacy, Javad-Prego",
            quant: 8,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Спутниковые геодезические приемники"
                    },
                    create: {
                        name: "Спутниковые геодезические приемники"
                    }
                }
            }
        }
    })
    const Orion = await db.tech.create({
        data: {
            name: "Орион",
            quant: 1,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Спутниковые геодезические приемники"
                    },
                    create: {
                        name: "Спутниковые геодезические приемники"
                    }
                }
            }
        }
    })
    const Thales = await db.tech.create({
        data: {
            name: "Thales Z-max",
            quant: 2,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Спутниковые геодезические приемники"
                    },
                    create: {
                        name: "Спутниковые геодезические приемники"
                    }
                }
            }
        }
    })
    const JavadOD = await db.tech.create({
        data: {
            name: "Javad Odyssey",
            quant: 1,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Спутниковые геодезические приемники"
                    },
                    create: {
                        name: "Спутниковые геодезические приемники"
                    }
                }
            }
        }
    })
    const ThalesM = await db.tech.create({
        data: {
            name: "Thales Mobile Mapper",
            quant: 14,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Спутниковые геодезические приемники"
                    },
                    create: {
                        name: "Спутниковые геодезические приемники"
                    }
                }
            }
        }
    })
    const Trimble = await db.tech.create({
        data: {
            name: "Trimble 5700, 4000SSi",
            quant: 4,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Спутниковые геодезические приемники"
                    },
                    create: {
                        name: "Спутниковые геодезические приемники"
                    }
                }
            }
        }
    })
    const ThalesPro = await db.tech.create({
        data: {
            name: "Thales Promark 2, Promark 3",
            quant: 8,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Спутниковые геодезические приемники"
                    },
                    create: {
                        name: "Спутниковые геодезические приемники"
                    }
                }
            }
        }
    })

    const tech1 = await db.techImg.create({
        data: {
            name: "Javad",
            img: "tech 1.jpg",
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Спутниковые геодезические приемники"
                    },
                    create: {
                        name: "Спутниковые геодезические приемники"
                    }
                }
            }
        }
    })
    const tech2 = await db.techImg.create({
        data: {
            name: "Thales Z-max",
            img: "tech 2.jpg",
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Спутниковые геодезические приемники"
                    },
                    create: {
                        name: "Спутниковые геодезические приемники"
                    }
                }
            }
        }
    })
    const tech3 = await db.techImg.create({
        data: {
            name: "Mobile Mapper",
            img: "tech 3.jpg",
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Спутниковые геодезические приемники"
                    },
                    create: {
                        name: "Спутниковые геодезические приемники"
                    }
                }
            }
        }
    })
    const tech4 = await db.techImg.create({
        data: {
            name: "Trimble 5700",
            img: "tech 4.jpg",
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Спутниковые геодезические приемники"
                    },
                    create: {
                        name: "Спутниковые геодезические приемники"
                    }
                }
            }
        }
    })
    const tech5 = await db.techImg.create({
        data: {
            name: "Thales Promark 2",
            img: "tech 5.jpg",
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Спутниковые геодезические приемники"
                    },
                    create: {
                        name: "Спутниковые геодезические приемники"
                    }
                }
            }
        }
    })
    const tech6 = await db.techImg.create({
        data: {
            name: "Thales Promark 3",
            img: "tech 6.jpg",
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Спутниковые геодезические приемники"
                    },
                    create: {
                        name: "Спутниковые геодезические приемники"
                    }
                }
            }
        }
    })
    const tech7 = await db.techImg.create({
        data: {
            name: "Leica TC - 2003",
            img: "tech 7.jpg",
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Электронные  высокоточные тахеометры"
                    },
                    create: {
                        name: "Электронные  высокоточные тахеометры"
                    }
                }
            }
        }
    })
    const tech8 = await db.techImg.create({
        data: {
            name: "Leica 802",
            img: "tech 8.jpg",
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Электронные  высокоточные тахеометры"
                    },
                    create: {
                        name: "Электронные  высокоточные тахеометры"
                    }
                }
            }
        }
    })
    const tech9 = await db.techImg.create({
        data: {
            name: "Leica TCR1205",
            img: "tech 9.jpg",
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Электронные тахометры"
                    },
                    create: {
                        name: "Электронные тахометры"
                    }
                }
            }
        }
    })
    const tech10 = await db.techImg.create({
        data: {
            name: "Sokkia Set 600",
            img: "tech 10.jpg",
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Электронные тахометры"
                    },
                    create: {
                        name: "Электронные тахометры"
                    }
                }
            }
        }
    })
    const tech11 = await db.techImg.create({
        data: {
            name: "DNA-03",
            img: "tech 11.jpg",
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Цифровой нивелир"
                    },
                    create: {
                        name: "Цифровой нивелир"
                    }
                }
            }
        }
    })
    const tech12 = await db.techImg.create({
        data: {
            name: "SDL 30",
            img: "tech 12.jpg",
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Цифровой нивелир"
                    },
                    create: {
                        name: "Цифровой нивелир"
                    }
                }
            }
        }
    })
    const tech13 = await db.techImg.create({
        data: {
            name: "3Т2КП",
            img: "tech 13.jpg",
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Теодолиты"
                    },
                    create: {
                        name: "Теодолиты"
                    }
                }
            }
        }
    })
    const tech14 = await db.techImg.create({
        data: {
            name: "3Т5КП",
            img: "tech 14.jpg",
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Теодолиты"
                    },
                    create: {
                        name: "Теодолиты"
                    }
                }
            }
        }
    })
    const tech15 = await db.techImg.create({
        data: {
            name: "3ТA5",
            img: "tech 15.jpg",
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Теодолиты"
                    },
                    create: {
                        name: "Теодолиты"
                    }
                }
            }
        }
    })
    const tech16 = await db.techImg.create({
        data: {
            name: "Н-05",
            img: "tech 16.jpg",
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Нивелиры"
                    },
                    create: {
                        name: "Нивелиры"
                    }
                }
            }
        }
    })
    const tech17 = await db.techImg.create({
        data: {
            name: "Н-3",
            img: "tech 17.jpg",
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Нивелиры"
                    },
                    create: {
                        name: "Нивелиры"
                    }
                }
            }
        }
    })
    const tech18 = await db.techImg.create({
        data: {
            name: "2СТ-10",
            img: "tech 18.jpg",
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Светодальномеры"
                    },
                    create: {
                        name: "Светодальномеры"
                    }
                }
            }
        }
    })
    const Leica2003 = await db.tech.create({
        data: {
            name: "Leica TC - 2003",
            quant: 1,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Электронные  высокоточные тахеометры"
                    },
                    create: {
                        name: "Электронные  высокоточные тахеометры"
                    }
                }
            }
        }
    })
    const Leica802 = await db.tech.create({
        data: {
            name: "Leica TSR-802",
            quant: 6,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Электронные  высокоточные тахеометры"
                    },
                    create: {
                        name: "Электронные  высокоточные тахеометры"
                    }
                }
            }
        }
    })
    const Leica405 = await db.tech.create({
        data: {
            name: "Leica TSR 405, TSR 405 Arctic, TSR 1205",
            quant: 38,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Электронные тахометры"
                    },
                    create: {
                        name: "Электронные тахометры"
                    }
                }
            }
        }
    })
    const TC600 = await db.tech.create({
        data: {
            name: "ТС-600, 3ТA-5М, Sokkia, Trimble",
            quant: 43,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Электронные тахометры"
                    },
                    create: {
                        name: "Электронные тахометры"
                    }
                }
            }
        }
    })
    const DNA03 = await db.tech.create({
        data: {
            name: "DNA - 03",
            quant: 1,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Цифровой нивелир"
                    },
                    create: {
                        name: "Цифровой нивелир"
                    }
                }
            }
        }
    })
    const SDL30 = await db.tech.create({
        data: {
            name: "SDL 30",
            quant: 1,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Цифровой нивелир"
                    },
                    create: {
                        name: "Цифровой нивелир"
                    }
                }
            }
        }
    })
    const UVK = await db.tech.create({
        data: {
            name: "УВК,T2, 2Т2, 3Т2КП, 2Т2КП",
            quant: 5,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Теодолиты"
                    },
                    create: {
                        name: "Теодолиты"
                    }
                }
            }
        }
    })
    const T5KP = await db.tech.create({
        data: {
            name: "3Т5КП,  2Т30П",
            quant: 10,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Теодолиты"
                    },
                    create: {
                        name: "Теодолиты"
                    }
                }
            }
        }
    })
    const H05 = await db.tech.create({
        data: {
            name: "Н-05",
            quant: 3,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Нивелиры"
                    },
                    create: {
                        name: "Нивелиры"
                    }
                }
            }
        }
    })
    const H03 = await db.tech.create({
        data: {
            name: "Н-3,  Н-3КП,  2-Н10КЛ,  2Н-3Л",
            quant: 22,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Нивелиры"
                    },
                    create: {
                        name: "Нивелиры"
                    }
                }
            }
        }
    })
    const CT05 = await db.tech.create({
        data: {
            name: "2СТ-5,  2СТ-10, СП-2",
            quant: 202,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Светодальномеры"
                    },
                    create: {
                        name: "Светодальномеры"
                    }
                }
            }
        }
    })
    const KH = await db.tech.create({
        data: {
            name: "КН,  КН-К,  КА",
            quant: 4,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Кипрегели"
                    },
                    create: {
                        name: "Кипрегели"
                    }
                }
            }
        }
    })
    const IT = await db.tech.create({
        data: {
            name: "ИТ-4,  ИТ-5",
            quant: 10,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Искатели  трубопроводов"
                    },
                    create: {
                        name: "Искатели  трубопроводов"
                    }
                }
            }
        }
    })
    const CFS = await db.tech.create({
        data: {
            name: "(ЦФС-М стерео),включая программное обеспечение DIGITALS",
            quant: 36,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Цифровая стереофотограмметрическая станция"
                    },
                    create: {
                        name: "Цифровая стереофотограмметрическая станция"
                    }
                }
            }
        }
    })
    const SHDFI = await db.tech.create({
        data: {
            name: "ШДФИ.466452.009. ( комплекс для аэрофотосъемки на базе беспилотного летательного аппарата)",
            quant: 2,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Комплекс геодезическо-топографический"
                    },
                    create: {
                        name: "Комплекс геодезическо-топографический"
                    }
                }
            }
        }
    })
    const SHDFIA = await db.tech.create({
        data: {
            name: "ШДФИ 462414.002.01.  ( комплекс для топографической съемки  на базе беспилотного летательного аппарата и комплекса стереовидеосъемки на автомобиле)",
            quant: 1,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Комплекс мобильный навигационный"
                    },
                    create: {
                        name: "Комплекс мобильный навигационный"
                    }
                }
            }
        }
    })
    const AFA = await db.tech.create({
        data: {
            name: "АФА-ТЭА-10; 7; 35",
            quant: 4,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Аэрофотоаппараты"
                    },
                    create: {
                        name: "Аэрофотоаппараты"
                    }
                }
            }
        }
    })
    const AFA2 = await db.tech.create({
        data: {
            name: "АФА 41/10; 42/20; А-Е/10,ПА-1",
            quant: 4,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Аэрофотоаппараты"
                    },
                    create: {
                        name: "Аэрофотоаппараты"
                    }
                }
            }
        }
    })
    const AFA3 = await db.tech.create({
        data: {
            name: "прибор  АФУС-У,  ЭКП-3",
            quant: 3,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Аэрофотоаппараты"
                    },
                    create: {
                        name: "Аэрофотоаппараты"
                    }
                }
            }
        }
    })
    const Planeta = await db.tech.create({
        data: {
            name: "«Планета» B-26",
            quant: 3,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Печатные  офсетные  машины"
                    },
                    create: {
                        name: "Печатные  офсетные  машины"
                    }
                }
            }
        }
    })
    const Graphtec = await db.tech.create({
        data: {
            name: "Graphtec CS 600",
            quant: 2,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Cканеры (формата А1-А0)"
                    },
                    create: {
                        name: "Cканеры (формата А1-А0)"
                    }
                }
            }
        }
    })
    const Contex = await db.tech.create({
        data: {
            name: "Contex SD-4490",
            quant: 1,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Cканеры (формата А1-А0)"
                    },
                    create: {
                        name: "Cканеры (формата А1-А0)"
                    }
                }
            }
        }
    })
    const FC30 = await db.tech.create({
        data: {
            name: "ФС-30,СКФ-ЦФ, СКФ-Ц",
            quant: 6,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Сканер фотограмметрический"
                    },
                    create: {
                        name: "Сканер фотограмметрический"
                    }
                }
            }
        }
    })
    const MAKO = await db.tech.create({
        data: {
            name: "ECRM MAKO 56",
            quant: 1,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Фотовыводное устройство"
                    },
                    create: {
                        name: "Фотовыводное устройство"
                    }
                }
            }
        }
    })
    const Koral = await db.tech.create({
        data: {
            name: "«Корал-2» (формат А0)",
            quant: 1,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Фотовыводное устройство"
                    },
                    create: {
                        name: "Фотовыводное устройство"
                    }
                }
            }
        }
    })
    const PC = await db.tech.create({
        data: {
            name: "ПЭВМ",
            quant: 420,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Фотовыводное устройство"
                    },
                    create: {
                        name: "Фотовыводное устройство"
                    }
                }
            }
        }
    })
    const PANORAMA724 = await db.tech.create({
        data: {
            name: "«ПАНОРАМА РЕДАКТОР» версия 7.24#8",
            quant: 65,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Программное обеспечение"
                    },
                    create: {
                        name: "Программное обеспечение"
                    }
                }
            }
        }
    })
    const PANORAMA915 = await db.tech.create({
        data: {
            name: "«ПАНОРАМА РЕДАКТОР» версия 9.15",
            quant: 15,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Программное обеспечение"
                    },
                    create: {
                        name: "Программное обеспечение"
                    }
                }
            }
        }
    })
    const PANORAMA10 = await db.tech.create({
        data: {
            name: "«ПАНОРАМА РЕДАКТОР» версия 10",
            quant: 8,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Программное обеспечение"
                    },
                    create: {
                        name: "Программное обеспечение"
                    }
                }
            }
        }
    })
    const GIS = await db.tech.create({
        data: {
            name: "ГИС КАРТА0",
            quant: 3,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Программное обеспечение"
                    },
                    create: {
                        name: "Программное обеспечение"
                    }
                }
            }
        }
    })
    const Microstation = await db.tech.create({
        data: {
            name: "Microstation",
            quant: 1,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Программное обеспечение"
                    },
                    create: {
                        name: "Программное обеспечение"
                    }
                }
            }
        }
    })
    const MAPINFIO8 = await db.tech.create({
        data: {
            name: "ГИС MAPINFIO ver 8",
            quant: 1,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Программное обеспечение"
                    },
                    create: {
                        name: "Программное обеспечение"
                    }
                }
            }
        }
    })
    const MAPINFIO9 = await db.tech.create({
        data: {
            name: "ГИС MAPINFIO ver 9",
            quant: 1,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Программное обеспечение"
                    },
                    create: {
                        name: "Программное обеспечение"
                    }
                }
            }
        }
    })
    const POLEGICA = await db.tech.create({
        data: {
            name: "ПО LEICA Geomatic OFFICE",
            quant: 22,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Программное обеспечение"
                    },
                    create: {
                        name: "Программное обеспечение"
                    }
                }
            }
        }
    })
    const Pinnacle = await db.tech.create({
        data: {
            name: "ПО Pinnacle ver 2.0",
            quant: 3,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Программное обеспечение"
                    },
                    create: {
                        name: "Программное обеспечение"
                    }
                }
            }
        }
    })
    const CREDO = await db.tech.create({
        data: {
            name: "ПО CREDO - ТОПОПЛАН,DAT, MIX и др",
            quant: 12,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Программное обеспечение"
                    },
                    create: {
                        name: "Программное обеспечение"
                    }
                }
            }
        }
    })
    const Transport = await db.tech.create({
        data: {
            name: "Автотранспорт",
            quant: 56,
            TechGroup: {
                connectOrCreate: {
                    where: {
                        name: "Автотранспорт"
                    },
                    create: {
                        name: "Автотранспорт"
                    }
                }
            }
        }
    })
    const izmUst = await db.file.create({
        data:{
            fileName: "Изменения в Устав ОАО \"ДВ АГП\"",
            filePath: "Izm_v_ustav.docx",
            type: "leg"
        }
    })
    const RoskartografiaDZO = await db.file.create({
        data:{
            fileName: "ПОРЯДОК ВЗАИМОДЕЙСТВИЯ ОАО «Роскартография» с открытыми акционерными обществами, акциями которых владеет ОАО «Роскартография»",
            filePath: "RoskartografiaDZO.docx",
            type: "leg"
        }
    })
    const Ukaz296 = await db.file.create({
        data:{
            fileName: "УКАЗ Президента РФ от 12 марта 2012 № 296 \"ОБ ОТКРЫТОМ АКЦИОНЕРНОМ ОБЩЕСТВЕ \"РОСКАРТОГРАФИЯ\"",
            filePath: "Ukaz296.docx",
            type: "leg"
        }
    })
    const UstavOAODVAGP = await db.file.create({
        data:{
            fileName: "Устав ОАО \"ДВ АГП\"",
            filePath: "UstavOAODVAGP.docx",
            type: "leg"
        }
    })
    const lic1 = await db.file.create({
        data:{
            fileName: "Лицензия · на· осуществление· геодезических и картографических работ, 27-000001Ф от 31 марта 2015г. Переоформлена 21 марта 2017г. (Страница 1)",
            filePath: "lic 1.jpg",
            type: "lic"
        }
    })
    const lic2 = await db.file.create({
        data:{
            fileName: "Лицензия · на· осуществление· геодезических и картографических работ, 27-000001Ф от 31 марта 2015г. Переоформлена 21 марта 2017г. (Страница 2)",
            filePath: "lic 2.jpg",
            type: "lic"
        }
    })
    const lic3 = await db.file.create({
        data:{
            fileName: "Приложение к лицензии 27-000001Ф от 31 марта 2015 г.  Переоформлена 21 марта 2017г. (Страница 1)",
            filePath: "lic 3.jpg",
            type: "lic"
        }
    })
    const lic4 = await db.file.create({
        data:{
            fileName: "Приложение к лицензии 27-000001Ф от 31 марта 2015 г. (Страница 2)",
            filePath: "lic 4.jpg",
            type: "lic"
        }
    })
    const lic5 = await db.file.create({
        data:{
            fileName: "Свидетельство о допуске к определенному виду или видам работ, которые оказывают влияние на безопасность объектов капитального строительства, 01-И-№ 0763-4 от 15 июля 2015г. (Страница 1)",
            filePath: "lic 5.jpg",
            type: "lic"
        }
    })
    const lic6 = await db.file.create({
        data:{
            fileName: "Свидетельство о допуске к определенному виду или видам работ, которые оказывают влияние на безопасность объектов капитального строительства, 01-И-№ 0763-4 от 15 июля 2015г. (Страница 2)",
            filePath: "lic 6.jpg",
            type: "lic"
        }
    })
    const lic7 = await db.file.create({
        data:{
            fileName: "Свидетельство о допуске к определенному виду или видам работ, которые оказывают влияние на безопасность объектов капитального строительства, 01-И-№ 0763-4 от 15 июля 2015г. (Страница 3)",
            filePath: "lic 7.jpg",
            type: "lic"
        }
    })
    const lic8 = await db.file.create({
        data:{
            fileName: "Лицензия на осуществление работ, связанных с использованием сведений, составляющих государственную тайну (степень секретности СС) ГТ №0074248 от 01 июня 2016г.",
            filePath: "lic 8.jpg",
            type: "lic"
        }
    })
    const lic9 = await db.file.create({
        data:{
            fileName: "Сертификат соответствия требованиям ГОСТ Р ИСО 9001-2011 (ISO 9001:2011).",
            filePath: "lic 9.jpg",
            type: "lic"
        }
    })
    const lic10 = await db.file.create({
        data:{
            fileName: "Сертификат соответствия требованиям ГОСТ Р ИСО 9001-2011 (ISO 9001:2011) (2).",
            filePath: "lic 10.jpg",
            type: "lic"
        }
    })
    const lic11 = await db.file.create({
        data:{
            fileName: "Аттестат аккредитации в области обеспечения единства измерений   -  признание компетентности выполнять работы и оказывать услуги по поверке средств измерений.",
            filePath: "lic 11.jpg",
            type: "lic"
        }
    })
    const lic12 = await db.file.create({
        data:{
            fileName: "Аттестат аккредитации в области обеспечения единства измерений   -  признание компетентности выполнять работы и оказывать услуги по поверке средств измерений. (2)",
            filePath: "lic 12.jpg",
            type: "lic"
        }
    })
    const lic13 = await db.file.create({
        data:{
            fileName: "Сводная ведомость результатов проведения специальной оценки условий труда.",
            filePath: "lic 13.jpg",
            type: "lic"
        }
    })
    const lic14 = await db.file.create({
        data:{
            fileName: "Сводная ведомость результатов проведения специальной оценки условий труда. (2)",
            filePath: "lic 14.jpg",
            type: "lic"
        }
    })
    const lic15 = await db.file.create({
        data:{
            fileName: "Сводная ведомость результатов проведения специальной оценки условий труда. (3)",
            filePath: "lic 15.jpg",
            type: "lic"
            
        }
    })
    const lic16 = await db.file.create({
        data:{
            fileName: "Перечень рекомендуемых мероприятий по улучшению условий труда.",
            filePath: "lic 16.jpg",
            type: "lic"
        }
    })

    for (let index = 1; index <= 18; index++) {
        let img = await db.img.create({
            data:{
                name: "tech "+index,
                filePath: "tech "+index+".jpg",
                PhotoAlbum: {
                    connectOrCreate: {
                        where: {
                            name: "Техническое оснащение"
                        },
                        create: {
                            name: "Техническое оснащение",
                            thumb: "tech 1.jpg"
                        }
                    }
                }
            }
        })        
    }
    for (let index = 1; index <=48; index++){
        let cat = await db.file.create({
            data:{
                fileName: "catalog "+index,
                filePath: "catalog "+index+".jpg",
                type: "cat"
            }
        })
    }
}



seed();