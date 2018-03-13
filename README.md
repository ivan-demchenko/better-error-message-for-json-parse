# Safe JSON Parse

The main goal of this project is to provide a nice error message for the `SyntaxError` that may occur while parsing JSON data.

For example, parsing the following JSON:

```
{
  "index": 1,
  "index_start_at": 56,
  "integer": 6,
  "float": 11.6816,
  "name": "Eva",
  "surname" "Rowland",
  "fullname": "Denise Pickett",
  "email": "jack@garrison.vc",
  "bool": false
}
```

will result in the following error message:

```
Unexpected string in JSON at position 105
  "name": "Eva",
  "surname" "Rowland",
-----------^
  "fullname": "Denise Pickett"
```
