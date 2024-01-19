"use client"

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

type Character = {
  id: string,
  name: string,
  alternate_names: string[],
  species: string,
  gender: string,
  house: string,
  dateOfBirth: string | null,
  yearOfBirth: number | null,
  wizard: boolean,
  ancestry: string,
  eyeColour: string,
  hairColour: string,
  wand: {
    wood: string,
    core: string,
    length: number | null
  },
  patronus: string,
  hogwartsStudent: boolean,
  hogwartsStaff: boolean,
  actor: string,
  alternate_actors: string[],
  alive: boolean,
  image: string
}

const fetcher = async (key: string) => {
  return await fetch(key).then((res) => res.json());
}

export default function Home() {
  const {data, error, isLoading} = useSWR<Character[]>("https://hp-api.onrender.com/api/characters", fetcher)

if (isLoading) return (<div className={"loading"} >Loading...</div>)
if (error) return (<div className={error} >Data acquisition failed.</div>)
if (data) return (
    <main>
      <h1>Characters</h1>
      <Link className={"link"} href={"/"}>TOP</Link>
      <div className={"characters"}>
        {data.map((character) => (
          <div key={character.id} className={"character"}>
            <Image
              className={"image"}
              src={character.image === "" ? "/noimage.jpg" : character.image}
              alt={""}
              width={50}
              height={60}
            />
            <div className="data">              
              <h2 className={"name"}>{character.name}</h2>
              <p className={"birth"}>{character.dateOfBirth ? character.dateOfBirth : "unknown"}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
