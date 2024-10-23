export const fetchLanguages = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json'
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  };
  