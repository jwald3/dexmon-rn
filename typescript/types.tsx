export type PokemonObject = {
    name: string;
    image_url: string;
    id: number;
    url?: string;
    types: [
        {
            type: {
                name: string;
                url: string;
            };
        }
    ];
    stats: [
        {
            base_stat: number;
            stat: {
                name: string;
                url: string;
            };
        }
    ];
    official_art: string;
    classification:
        | Array<{
              genus: string;
              language: {
                  name: string;
                  url: string;
              };
          }>
        | undefined;
    flavor_text?: Array<{
        flavor_text: string;
        language: {
            name: string;
            url: string;
        };
    }>;
    height: number;
    weight: number;
    chain?: {
        species: {
            name: string;
            url: string;
        };
        image_url: string;
        evolves_to: Array<{
            species: {
                name: string;
                url: string;
            };
            image_url: string;
            evolves_to: Array<{
                species: {
                    name: string;
                    url: string;
                };
                image_url: string;
                evolves_to: Array<{
                    species: {
                        name: string;
                        url: string;
                    };
                    image_url: string;
                    evolves_to: [];
                }>;
            }>;
        }>;
    };
};
