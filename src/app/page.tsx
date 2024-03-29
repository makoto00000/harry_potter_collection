"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function Home() {
  const [characters, setCharactors] = useState<Character[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getCharacters = async() => {
    const res = await fetch("https://hp-api.onrender.com/api/characters");
    try {
      const data = await res.json();
      setCharactors(data);

    } catch (error) {
      setError(true);

    } finally {
      setLoading(false);
    }

  }
  useEffect(() => {
    getCharacters();
  }, [])

if (loading) return (<div className={"loading"} >Loading...</div>)
if (error) return (<div className={"error"} >Data acquisition failed.</div>)
if (characters) return (
    <main>
      <h1>Characters</h1>
      <Link href={"/swr"}>SWR</Link>
      <div className={"characters"}>
        {characters.map((character) => (
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
