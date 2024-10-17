import { Show, GridItem, Grid,HStack,Flex,Box } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { Genre } from "./hooks/useGenres";
import { useState } from "react";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/useGames";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";
export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder:string
  searchText:string
}
function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar onSearch={(searchText)=>setGameQuery({...gameQuery,searchText})}/>
      </GridItem>
      <Show above="lg">
        {" "}
        <GridItem area="aside" paddingX="17px">
          <GenreList
            selectedGenre={gameQuery.genre}
            onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
          />
        </GridItem>
      </Show>

      <GridItem area="main">
        <GameHeading gameQuery={gameQuery}/>
        <Flex paddingLeft={7}>
          <Box marginRight={5}>
            <PlatformSelector
            
              onSelectPlatfrom={(platform) =>
                setGameQuery({ ...gameQuery, platform })
              }
              selectedPlatform={gameQuery.platform}
            />
          </Box>
          <SortSelector sortOrder={gameQuery.sortOrder} onSelecSortOrder={(sortOrder) => setGameQuery({...gameQuery,sortOrder})}></SortSelector>
        </Flex>
        <GameGrid
          gameQuery={gameQuery}
        />
      </GridItem>
    </Grid>
  );
}

export default App;