import { ProductExtended } from "../models/product";

export const mockedProducts: ProductExtended[] = [
  {
    id: "c53e053c-3558-4907-b762-22808eea02c5",
    createdOn: "2023-09-08T18:18:38Z",
    updatedOn: "2024-02-13T01:52:31Z",
    title: "Two Sisters from Boston",
    description:
      "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    price: 3038,
    categoryId: null,
    category: null,
  },
  {
    id: "250ebe19-13d8-421f-a536-c97cded8e819",
    createdOn: "2023-12-03T18:56:13Z",
    updatedOn: "2023-08-02T21:11:45Z",
    title: "Imagine: John Lennon",
    description:
      "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    price: 5482,
    categoryId: "ef4385d5-98ff-4241-a231-80300bb1c2da",
    category: {
      id: "ef4385d5-98ff-4241-a231-80300bb1c2da",
      title: "Elsewhere",
    },
  },
  {
    id: "c3aad0d1-f690-4d69-b2e1-e4369d180883",
    createdOn: "2023-05-01T01:42:14Z",
    updatedOn: "2022-11-21T11:38:43Z",
    title: "Farmageddon",
    description:
      "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    price: 4586,
    categoryId: null,
    category: null,
  },
  {
    id: "ee80197f-f13d-4bfe-8fd1-ed208a3d0e22",
    createdOn: "2023-09-04T04:42:51Z",
    updatedOn: "2023-11-16T13:33:15Z",
    title: "Gracie",
    description:
      "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    price: 782,
    categoryId: "ef4385d5-98ff-4241-a231-80300bb1c2da",
    category: {
      id: "ef4385d5-98ff-4241-a231-80300bb1c2da",
      title: "Elsewhere",
    },
  },
  {
    id: "85b47174-ca96-4539-9ce2-d4cc9f8d57db",
    createdOn: "2022-11-25T04:28:21Z",
    updatedOn: "2023-12-01T20:44:15Z",
    title: "Joshua",
    description:
      "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    price: 4911,
    categoryId: null,
    category: null,
  },
  {
    id: "31ae4e04-b9e0-4a4e-82f9-42efa3f5dfc3",
    createdOn: "2023-08-11T13:15:52Z",
    updatedOn: "2023-02-26T12:37:08Z",
    title: "In Your Dreams (Dans tes rêves)",
    description:
      "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
    price: 1760,
    categoryId: null,
    category: null,
  },
];
