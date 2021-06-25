import axios from 'axios';

export const fetcher = url => axios.get(url).then(res => res.data);

export const formatCurrency = (value = 0, options = null) => {
  const opts = {
    currency: 'USD',
    maximumFractionDigits: 10,
    ...options,
  };

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    ...opts,
  }).format(value);
};

export const formatNumber = (value, options = null) => {
  const opts = {
    notation: 'standard',
    compactDisplay: 'long',
    maximumFractionDigits: 2,
    ...options,
  };

  return new Intl.NumberFormat('en-US', opts).format(value);
};

export const formatDate = (value, options = null) => {
  const opts = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat('en-US', opts).format(value);
};

export const formatSparklineData = (data = []) => [
  {
    label: 'Last 7 days',
    data: data?.map((value, i) => ({
      primary: i,
      secondary: value,
    })),
  },
];

export const createMarkup = str => {
  return {
    __html: str.replace(
      /<a href="([^>]+)">(.+?)<\/a>/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>'
    ),
  };
};

export const generateDemoText = () => {
  return [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor eget dolor morbi non. Natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Ac ut consequat semper viverra nam libero. Risus viverra adipiscing at in tellus integer feugiat scelerisque. Elit eget gravida cum sociis natoque penatibus et magnis. Tellus in hac habitasse platea dictumst vestibulum. Sit amet nisl suscipit adipiscing bibendum est. Dui vivamus arcu felis bibendum ut tristique et egestas. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Pellentesque id nibh tortor id aliquet. Magna ac placerat vestibulum lectus mauris ultrices. Amet consectetur adipiscing elit duis tristique. Tellus elementum sagittis vitae et leo duis ut. Amet consectetur adipiscing elit duis. Pellentesque habitant morbi tristique senectus et. Vitae elementum curabitur vitae nunc sed velit. At imperdiet dui accumsan sit. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Ultrices tincidunt arcu non sodales neque.',

    'Vivamus arcu felis bibendum ut tristique et. In metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Amet commodo nulla facilisi nullam vehicula ipsum a. Dolor purus non enim praesent elementum facilisis leo vel fringilla. Nisl vel pretium lectus quam id leo in vitae turpis. Platea dictumst quisque sagittis purus sit amet volutpat. Sociis natoque penatibus et magnis dis parturient montes. Tellus mauris a diam maecenas sed enim ut. Enim facilisis gravida neque convallis. Praesent elementum facilisis leo vel fringilla est. Donec pretium vulputate sapien nec sagittis aliquam malesuada. Nunc non blandit massa enim nec dui nunc mattis. Adipiscing tristique risus nec feugiat in fermentum. Nam at lectus urna duis.',

    'Sit amet aliquam id diam maecenas ultricies. Tempus quam pellentesque nec nam. Facilisi nullam vehicula ipsum a arcu. Tellus id interdum velit laoreet. Vulputate enim nulla aliquet porttitor lacus luctus accumsan. Sociis natoque penatibus et magnis dis parturient. Mus mauris vitae ultricies leo. Dictum at tempor commodo ullamcorper a lacus. Non enim praesent elementum facilisis leo vel fringilla est ullamcorper. Sit amet dictum sit amet justo donec enim. Urna neque viverra justo nec ultrices dui sapien. Orci phasellus egestas tellus rutrum tellus. In hac habitasse platea dictumst quisque.',

    'Pretium nibh ipsum consequat nisl vel pretium. Ultrices dui sapien eget mi proin. Lectus arcu bibendum at varius vel. Lorem dolor sed viverra ipsum nunc. Vel facilisis volutpat est velit egestas dui id ornare arcu. Potenti nullam ac tortor vitae purus. Donec ultrices tincidunt arcu non sodales neque sodales. Egestas pretium aenean pharetra magna ac. Eu mi bibendum neque egestas congue quisque. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. At volutpat diam ut venenatis. Vitae tortor condimentum lacinia quis vel eros. Integer enim neque volutpat ac tincidunt vitae semper quis. Velit dignissim sodales ut eu sem. Erat pellentesque adipiscing commodo elit. Nullam vehicula ipsum a arcu cursus vitae congue mauris. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam id.',

    'Pharetra sit amet aliquam id diam maecenas ultricies mi eget. Libero enim sed faucibus turpis in eu mi. In mollis nunc sed id semper risus in. Libero id faucibus nisl tincidunt eget. Risus feugiat in ante metus. Neque vitae tempus quam pellentesque. Gravida in fermentum et sollicitudin ac orci phasellus egestas. Etiam non quam lacus suspendisse faucibus interdum posuere lorem. Vel eros donec ac odio tempor orci dapibus. In nisl nisi scelerisque eu ultrices vitae auctor. Eu facilisis sed odio morbi quis commodo odio aenean sed.',
  ];
};
