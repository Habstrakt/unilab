const sizeTestCases = [
  {
    name: "Минимальное значение size",
    size: 1,
    expected: {size: 1},
    status: 200
  },
  {
    name: "Максимальное значение size",
    size: 100,
    expected: {size: 100},
    status: 200
  },
  {
    name: "Превышение максимального size",
    size: 101,
    expected: {
      detail: [{
        ctx: {limit_value: 100},
        loc: ["query", "size"],
        msg: "ensure this value is less than or equal to 100",
        type: "value_error.number.not_le"
      }]
    },
    status: 422
  },
    {
    name: "Отрицательное значение параметра size",
    size: -1,
    expected: {
      detail: [{
        ctx: {limit_value: 1},
        loc: ["query", "size"],
        msg: "ensure this value is greater than or equal to 1",
        type: "value_error.number.not_ge"
      }]
    },
    status: 422
  },
  {
    name: "Недопустимое значение size",
    size: "abc",
    expected: {
      detail: [{
        loc: ["query", "size"],
        msg: "value is not a valid integer",
        type: "type_error.integer"
      }]
    },
    status: 422
  },
];

const pageTestCases = [
  {
    name: "Отрицательное значение параметра page",
    page: -1,
    expected: {
      detail: [{
        ctx: {"limit_value": 1},
        loc: ["query", "page"],
        msg: "ensure this value is greater than or equal to 1",
        type: "value_error.number.not_ge"
      }]
    },
    status: 422
  },
  {
    name: "Некорректный тип параметра page",
    page: "abc",
    expected: {
      detail: [{
        loc: ["query", "page"],
        msg: "value is not a valid integer",
        type: "type_error.integer"
      }]
    },
    status: 422
  },
]

const articleIds = [
  {
    name: "Проверка на получение существующей статьи",
    id: null,
    expected: null as any,
    status: 200,
    useDynamicId: true
  },
  {
    name: "Проверка получение статьи по несуществующему ID",
    id: 9999,
    expected: { detail: "Resource not found" },
    status: 404,
    useDynamicId: false
  },
  {
    name: "Проверка получение статьи с отрицательным ID",
    id: -1,
    expected: {detail: "Resource not found"},
    status: 404,
    useDynamicId: false
  },
  {
    name: "Проверка получения статьи с нулевым ID",
    id: 0,
    expected: {detail: "Resource not found"},
    status: 404,
    useDynamicId: false
  },
  {
    name: "Проверка получения статьи с текстовым ID",
    id: "abc",
    expected: {
      detail: [{
        loc: ["path", "id"],
        msg: "value is not a valid integer",
        type: "type_error.integer"
      }],
    },
    status: 422,
    useDynamicId: false
  },
  {
    name: "Проверка получения статьи с дробным ID",
    id: 1.5,
    expected: {
            detail: [{
        loc: ["path", "id"],
        msg: "value is not a valid integer",
        type: "type_error.integer"
      }],
    },
    status: 422,
    useDynamicId: false
  }
];

export {sizeTestCases, articleIds, pageTestCases};