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
        data:{
            name:"Javad Legacy, Javad-Prego",
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
        data:{
            name:"Орион",
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
        data:{
            name:"Thales Z-max",
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
        data:{
            name:"Javad Odyssey",
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
        data:{
            name:"Thales Mobile Mapper",
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
        data:{
            name:"Trimble 5700, 4000SSi",
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
        data:{
            name:"Thales Promark 2, Promark 3",
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
}


seed();