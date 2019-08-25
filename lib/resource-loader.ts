const directories = [
  'body-shapes',
  'clothes',
  'face-shapes',
  'face-components',
  'hairs'
];

type LoaderParam = {
  resourcePath: string;
};

export const loadAndValidateResources =
  async (param: LoaderParam) => {
    console.log(param);
  };