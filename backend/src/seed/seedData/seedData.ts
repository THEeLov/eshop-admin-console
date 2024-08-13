import type { CategoryRow } from '../../category/types';
import type { ProductRow } from '../../product/types';

export const categories: CategoryRow[] = [
  {
    id: 'c4f59006-05f3-4ac9-a299-4b190e9c817e',
    createdOn: new Date('2023-03-07T15:09:30Z'),
    updatedOn: new Date('2024-01-03T13:12:04Z'),
    title: 'Midnight Man',
    description:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
  },
  {
    id: 'b0a1f7fc-85a0-437b-8601-d009692a45c1',
    createdOn: new Date('2024-02-08T11:38:32Z'),
    updatedOn: new Date('2023-10-29T08:51:43Z'),
    title: 'Night of the Ghouls',
    description:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
  },
  {
    id: '91dab659-7063-431e-9f72-627cef6a0b6f',
    createdOn: new Date('2023-01-06T01:57:33Z'),
    updatedOn: new Date('2023-12-31T21:36:09Z'),
    title: 'Quick Change',
    description: 'Fusce consequat. Nulla nisl. Nunc nisl.',
  },
  {
    id: 'fdfd5621-f5f7-464c-9dc8-4d6798b4f64f',
    createdOn: new Date('2023-11-29T01:26:38Z'),
    updatedOn: new Date('2024-01-17T15:23:17Z'),
    title: 'Sugar & Spice',
    description:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
  },
  {
    id: 'efc46a50-93a7-4b58-928b-189e674dcbae',
    createdOn: new Date('2023-06-15T09:20:57Z'),
    updatedOn: new Date('2023-09-07T22:18:37Z'),
    title: "David Holzman's Diary",
    description:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
  },
  {
    id: '9893d6d7-18f4-43b3-a648-d156143703a0',
    createdOn: new Date('2024-01-29T09:06:48Z'),
    updatedOn: new Date('2024-03-06T02:16:50Z'),
    title: 'Che: Part One',
    description:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
  },
  {
    id: '1c886496-300f-43f1-a358-ff757fc13c8b',
    createdOn: new Date('2023-07-05T11:59:48Z'),
    updatedOn: new Date('2023-04-07T02:39:38Z'),
    title: 'Franklyn',
    description:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
  },
  {
    id: '71d7fa94-cee0-4da6-9991-6bf7d3ee191d',
    createdOn: new Date('2022-10-09T07:39:34Z'),
    updatedOn: new Date('2023-08-24T20:38:23Z'),
    title: 'Dona Flor and Her Two Husbands (Dona Flor e Seus Dois Maridos)',
    description:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
  },
  {
    id: 'd79f2cca-6cd3-46c7-a4dc-ae715fd5fe9c',
    createdOn: new Date('2023-08-06T20:14:55Z'),
    updatedOn: new Date('2023-05-06T13:48:48Z'),
    title: 'Smashing Pumpkins: If All Goes Wrong',
    description:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
  },
  {
    id: 'd72994e0-3f3f-4491-9e38-ffd8c58ba5dc',
    createdOn: new Date('2022-11-14T19:01:35Z'),
    updatedOn: new Date('2023-05-15T10:15:54Z'),
    title: 'Fantastic Fear of Everything, A',
    description:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
  },
];

export const products: ProductRow[] = [
  {
    id: 'c53e053c-3558-4907-b762-22808eea02c5',
    createdOn: new Date('2023-09-08T18:18:38Z'),
    updatedOn: new Date('2024-02-13T01:52:31Z'),
    title: 'Two Sisters from Boston',
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    price: 3038,
    categoryId: null,
  },
  {
    id: '250ebe19-13d8-421f-a536-c97cded8e819',
    createdOn: new Date('2023-12-03T18:56:13Z'),
    updatedOn: new Date('2023-08-02T21:11:45Z'),
    title: 'Imagine: John Lennon',
    description:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    price: 5482,
    categoryId: 'b0a1f7fc-85a0-437b-8601-d009692a45c1',
  },
  {
    id: 'c3aad0d1-f690-4d69-b2e1-e4369d180883',
    createdOn: new Date('2023-05-01T01:42:14Z'),
    updatedOn: new Date('2022-11-21T11:38:43Z'),
    title: 'Farmageddon',
    description:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    price: 4586,
    categoryId: null,
  },
  {
    id: 'ee80197f-f13d-4bfe-8fd1-ed208a3d0e22',
    createdOn: new Date('2023-09-04T04:42:51Z'),
    updatedOn: new Date('2023-11-16T13:33:15Z'),
    title: 'Gracie',
    description:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    price: 782,
    categoryId: 'b0a1f7fc-85a0-437b-8601-d009692a45c1',
  },
  {
    id: '85b47174-ca96-4539-9ce2-d4cc9f8d57db',
    createdOn: new Date('2022-11-25T04:28:21Z'),
    updatedOn: new Date('2023-12-01T20:44:15Z'),
    title: 'Joshua',
    description:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    price: 4911,
    categoryId: null,
  },
  {
    id: '31ae4e04-b9e0-4a4e-82f9-42efa3f5dfc3',
    createdOn: new Date('2023-08-11T13:15:52Z'),
    updatedOn: new Date('2023-02-26T12:37:08Z'),
    title: 'In Your Dreams (Dans tes rêves)',
    description:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    price: 1760,
    categoryId: null,
  },
];
