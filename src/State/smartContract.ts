const smartContract = [
  {
    prim: 'parameter',
    args: [
      {
        prim: 'or',
        args: [
          {
            prim: 'or',
            args: [
              {
                prim: 'pair',
                args: [
                  {
                    prim: 'list',
                    args: [
                      {
                        prim: 'pair',
                        args: [
                          { prim: 'address', annots: ['%owner'] },
                          { prim: 'nat', annots: ['%token_id'] },
                        ],
                      },
                    ],
                    annots: ['%requests'],
                  },
                  {
                    prim: 'contract',
                    args: [
                      {
                        prim: 'list',
                        args: [
                          {
                            prim: 'pair',
                            args: [
                              {
                                prim: 'pair',
                                args: [
                                  { prim: 'address', annots: ['%owner'] },
                                  { prim: 'nat', annots: ['%token_id'] },
                                ],
                                annots: ['%request'],
                              },
                              { prim: 'nat', annots: ['%balance'] },
                            ],
                          },
                        ],
                      },
                    ],
                    annots: ['%callback'],
                  },
                ],
                annots: ['%balance_of'],
              },
              {
                prim: 'list',
                args: [
                  {
                    prim: 'pair',
                    args: [
                      { prim: 'address', annots: ['%to_'] },
                      {
                        prim: 'pair',
                        args: [
                          { prim: 'nat', annots: ['%token_id'] },
                          { prim: 'nat', annots: ['%amount'] },
                        ],
                      },
                    ],
                  },
                ],
                annots: ['%mint'],
              },
            ],
          },
          {
            prim: 'or',
            args: [
              {
                prim: 'list',
                args: [
                  {
                    prim: 'pair',
                    args: [
                      { prim: 'address', annots: ['%from_'] },
                      {
                        prim: 'list',
                        args: [
                          {
                            prim: 'pair',
                            args: [
                              { prim: 'address', annots: ['%to_'] },
                              {
                                prim: 'pair',
                                args: [
                                  { prim: 'nat', annots: ['%token_id'] },
                                  { prim: 'nat', annots: ['%amount'] },
                                ],
                              },
                            ],
                          },
                        ],
                        annots: ['%txs'],
                      },
                    ],
                  },
                ],
                annots: ['%transfer'],
              },
              {
                prim: 'list',
                args: [
                  {
                    prim: 'or',
                    args: [
                      {
                        prim: 'pair',
                        args: [
                          { prim: 'address', annots: ['%owner'] },
                          {
                            prim: 'pair',
                            args: [
                              { prim: 'address', annots: ['%operator'] },
                              { prim: 'nat', annots: ['%token_id'] },
                            ],
                          },
                        ],
                        annots: ['%add_operator'],
                      },
                      {
                        prim: 'pair',
                        args: [
                          { prim: 'address', annots: ['%owner'] },
                          {
                            prim: 'pair',
                            args: [
                              { prim: 'address', annots: ['%operator'] },
                              { prim: 'nat', annots: ['%token_id'] },
                            ],
                          },
                        ],
                        annots: ['%remove_operator'],
                      },
                    ],
                  },
                ],
                annots: ['%update_operators'],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    prim: 'storage',
    args: [
      {
        prim: 'pair',
        args: [
          {
            prim: 'pair',
            args: [
              {
                prim: 'pair',
                args: [
                  { prim: 'address', annots: ['%admin'] },
                  {
                    prim: 'list',
                    args: [{ prim: 'nat' }],
                    annots: ['%all_tokens'],
                  },
                ],
              },
              {
                prim: 'pair',
                args: [
                  {
                    prim: 'big_map',
                    args: [
                      {
                        prim: 'pair',
                        args: [{ prim: 'address' }, { prim: 'nat' }],
                      },
                      { prim: 'nat' },
                    ],
                    annots: ['%ledger'],
                  },
                  {
                    prim: 'big_map',
                    args: [{ prim: 'string' }, { prim: 'bytes' }],
                    annots: ['%metadata'],
                  },
                ],
              },
            ],
          },
          {
            prim: 'pair',
            args: [
              {
                prim: 'pair',
                args: [
                  {
                    prim: 'big_map',
                    args: [
                      {
                        prim: 'pair',
                        args: [
                          { prim: 'address' },
                          {
                            prim: 'pair',
                            args: [{ prim: 'address' }, { prim: 'nat' }],
                          },
                        ],
                      },
                      { prim: 'unit' },
                    ],
                    annots: ['%operators'],
                  },
                  {
                    prim: 'big_map',
                    args: [
                      { prim: 'nat' },
                      {
                        prim: 'pair',
                        args: [
                          { prim: 'nat', annots: ['%token_id'] },
                          {
                            prim: 'map',
                            args: [{ prim: 'string' }, { prim: 'bytes' }],
                            annots: ['%token_info'],
                          },
                        ],
                      },
                    ],
                    annots: ['%token_metadata'],
                  },
                ],
              },
              {
                prim: 'big_map',
                args: [{ prim: 'nat' }, { prim: 'nat' }],
                annots: ['%total_supply'],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    prim: 'code',
    args: [
      [
        {
          prim: 'PUSH',
          args: [{ prim: 'string' }, { string: 'FA2_TOKEN_UNDEFINED' }],
        },
        {
          prim: 'PUSH',
          args: [{ prim: 'string' }, { string: 'FA2_INSUFFICIENT_BALANCE' }],
        },
        { prim: 'DIG', args: [{ int: '2' }] },
        { prim: 'UNPAIR' },
        {
          prim: 'IF_LEFT',
          args: [
            [
              {
                prim: 'IF_LEFT',
                args: [
                  [
                    { prim: 'DIG', args: [{ int: '2' }] },
                    { prim: 'DIG', args: [{ int: '3' }] },
                    { prim: 'DROP', args: [{ int: '2' }] },
                    { prim: 'DUP' },
                    { prim: 'CAR' },
                    {
                      prim: 'MAP',
                      args: [
                        [
                          { prim: 'DUP' },
                          { prim: 'DUP', args: [{ int: '4' }] },
                          { prim: 'CAR' },
                          { prim: 'CDR' },
                          { prim: 'CAR' },
                          { prim: 'DUP', args: [{ int: '3' }] },
                          { prim: 'CDR' },
                          { prim: 'DIG', args: [{ int: '3' }] },
                          { prim: 'CAR' },
                          { prim: 'PAIR' },
                          { prim: 'GET' },
                          {
                            prim: 'IF_NONE',
                            args: [
                              [
                                {
                                  prim: 'PUSH',
                                  args: [{ prim: 'nat' }, { int: '0' }],
                                },
                              ],
                              [],
                            ],
                          },
                          { prim: 'SWAP' },
                          { prim: 'PAIR' },
                        ],
                      ],
                    },
                    { prim: 'SWAP' },
                    { prim: 'CDR' },
                    { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
                    { prim: 'DIG', args: [{ int: '2' }] },
                    { prim: 'TRANSFER_TOKENS' },
                    { prim: 'SWAP' },
                    { prim: 'NIL', args: [{ prim: 'operation' }] },
                    { prim: 'DIG', args: [{ int: '2' }] },
                    { prim: 'CONS' },
                    { prim: 'PAIR' },
                  ],
                  [
                    { prim: 'SENDER' },
                    {
                      prim: 'PUSH',
                      args: [{ prim: 'string' }, { string: 'NOT_ADMIN' }],
                    },
                    { prim: 'DUP', args: [{ int: '4' }] },
                    { prim: 'CAR' },
                    { prim: 'CAR' },
                    { prim: 'CAR' },
                    { prim: 'DIG', args: [{ int: '2' }] },
                    { prim: 'COMPARE' },
                    { prim: 'EQ' },
                    {
                      prim: 'IF',
                      args: [[{ prim: 'DROP' }], [{ prim: 'FAILWITH' }]],
                    },
                    {
                      prim: 'ITER',
                      args: [
                        [
                          { prim: 'DUP' },
                          { prim: 'DUG', args: [{ int: '2' }] },
                          { prim: 'GET', args: [{ int: '3' }] },
                          { prim: 'DUP', args: [{ int: '3' }] },
                          { prim: 'GET', args: [{ int: '4' }] },
                          { prim: 'SWAP' },
                          { prim: 'DUP' },
                          { prim: 'DUG', args: [{ int: '2' }] },
                          { prim: 'DIG', args: [{ int: '4' }] },
                          { prim: 'CAR' },
                          { prim: 'PAIR' },
                          { prim: 'DUP', args: [{ int: '6' }] },
                          { prim: 'DUP', args: [{ int: '5' }] },
                          { prim: 'CDR' },
                          { prim: 'CAR' },
                          { prim: 'CDR' },
                          { prim: 'DUP', args: [{ int: '5' }] },
                          { prim: 'MEM' },
                          {
                            prim: 'IF',
                            args: [[{ prim: 'DROP' }], [{ prim: 'FAILWITH' }]],
                          },
                          { prim: 'DUP', args: [{ int: '5' }] },
                          {
                            prim: 'PUSH',
                            args: [{ prim: 'nat' }, { int: '1' }],
                          },
                          { prim: 'DUP', args: [{ int: '4' }] },
                          { prim: 'COMPARE' },
                          { prim: 'LE' },
                          {
                            prim: 'IF',
                            args: [[{ prim: 'DROP' }], [{ prim: 'FAILWITH' }]],
                          },
                          {
                            prim: 'PUSH',
                            args: [{ prim: 'nat' }, { int: '0' }],
                          },
                          { prim: 'DIG', args: [{ int: '2' }] },
                          { prim: 'COMPARE' },
                          { prim: 'EQ' },
                          {
                            prim: 'IF',
                            args: [
                              [{ prim: 'DROP', args: [{ int: '2' }] }],
                              [
                                { prim: 'DUP', args: [{ int: '4' }] },
                                {
                                  prim: 'PUSH',
                                  args: [{ prim: 'nat' }, { int: '0' }],
                                },
                                { prim: 'DUP', args: [{ int: '5' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'DUP', args: [{ int: '4' }] },
                                { prim: 'GET' },
                                {
                                  prim: 'IF_NONE',
                                  args: [
                                    [
                                      {
                                        prim: 'PUSH',
                                        args: [{ prim: 'nat' }, { int: '0' }],
                                      },
                                    ],
                                    [],
                                  ],
                                },
                                { prim: 'COMPARE' },
                                { prim: 'EQ' },
                                {
                                  prim: 'IF',
                                  args: [
                                    [{ prim: 'DROP' }],
                                    [{ prim: 'FAILWITH' }],
                                  ],
                                },
                                { prim: 'DUP', args: [{ int: '3' }] },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'DUP', args: [{ int: '3' }] },
                                { prim: 'GET' },
                                {
                                  prim: 'IF_NONE',
                                  args: [
                                    [
                                      { prim: 'DUP', args: [{ int: '5' }] },
                                      { prim: 'FAILWITH' },
                                    ],
                                    [],
                                  ],
                                },
                                {
                                  prim: 'PUSH',
                                  args: [{ prim: 'nat' }, { int: '1' }],
                                },
                                { prim: 'ADD' },
                                { prim: 'DUP', args: [{ int: '4' }] },
                                { prim: 'CDR' },
                                { prim: 'DUP', args: [{ int: '5' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'DUP', args: [{ int: '6' }] },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                {
                                  prim: 'PUSH',
                                  args: [{ prim: 'nat' }, { int: '1' }],
                                },
                                { prim: 'DIG', args: [{ int: '5' }] },
                                { prim: 'SWAP' },
                                { prim: 'SOME' },
                                { prim: 'SWAP' },
                                { prim: 'UPDATE' },
                                { prim: 'PAIR' },
                                { prim: 'DUP', args: [{ int: '5' }] },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'PAIR' },
                                { prim: 'PAIR' },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'CDR' },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'SOME' },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'UPDATE' },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'PAIR' },
                                { prim: 'SWAP' },
                                { prim: 'CAR' },
                                { prim: 'PAIR' },
                              ],
                            ],
                          },
                        ],
                      ],
                    },
                    { prim: 'SWAP' },
                    { prim: 'DIG', args: [{ int: '2' }] },
                    { prim: 'DROP', args: [{ int: '2' }] },
                    { prim: 'NIL', args: [{ prim: 'operation' }] },
                    { prim: 'PAIR' },
                  ],
                ],
              },
            ],
            [
              {
                prim: 'IF_LEFT',
                args: [
                  [
                    { prim: 'SENDER' },
                    { prim: 'DUP', args: [{ int: '3' }] },
                    { prim: 'CAR' },
                    { prim: 'CDR' },
                    { prim: 'CAR' },
                    { prim: 'DIG', args: [{ int: '2' }] },
                    {
                      prim: 'ITER',
                      args: [
                        [
                          { prim: 'DUP' },
                          { prim: 'DUG', args: [{ int: '2' }] },
                          { prim: 'CAR' },
                          { prim: 'SWAP' },
                          { prim: 'DIG', args: [{ int: '2' }] },
                          { prim: 'CDR' },
                          {
                            prim: 'ITER',
                            args: [
                              [
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'CAR' },
                                { prim: 'DUP', args: [{ int: '3' }] },
                                { prim: 'GET', args: [{ int: '3' }] },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'GET', args: [{ int: '4' }] },
                                { prim: 'SWAP' },
                                { prim: 'DUP' },
                                { prim: 'DUG', args: [{ int: '2' }] },
                                { prim: 'DUP', args: [{ int: '6' }] },
                                { prim: 'PAIR' },
                                { prim: 'DUP', args: [{ int: '3' }] },
                                { prim: 'DUP', args: [{ int: '5' }] },
                                { prim: 'PAIR' },
                                {
                                  prim: 'PUSH',
                                  args: [
                                    { prim: 'string' },
                                    { string: 'FA2_NOT_OPERATOR' },
                                  ],
                                },
                                { prim: 'DUP', args: [{ int: '10' }] },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CAR' },
                                { prim: 'DUP', args: [{ int: '6' }] },
                                { prim: 'DUP', args: [{ int: '11' }] },
                                { prim: 'PAIR' },
                                { prim: 'DUP', args: [{ int: '10' }] },
                                { prim: 'PAIR' },
                                { prim: 'MEM' },
                                { prim: 'DUP', args: [{ int: '9' }] },
                                { prim: 'DUP', args: [{ int: '11' }] },
                                { prim: 'COMPARE' },
                                { prim: 'EQ' },
                                { prim: 'OR' },
                                {
                                  prim: 'IF',
                                  args: [
                                    [{ prim: 'DROP' }],
                                    [{ prim: 'FAILWITH' }],
                                  ],
                                },
                                { prim: 'DUP', args: [{ int: '11' }] },
                                { prim: 'DUP', args: [{ int: '10' }] },
                                { prim: 'CDR' },
                                { prim: 'CAR' },
                                { prim: 'CDR' },
                                { prim: 'DIG', args: [{ int: '5' }] },
                                { prim: 'MEM' },
                                {
                                  prim: 'IF',
                                  args: [
                                    [{ prim: 'DROP' }],
                                    [{ prim: 'FAILWITH' }],
                                  ],
                                },
                                {
                                  prim: 'PUSH',
                                  args: [
                                    { prim: 'string' },
                                    { string: 'FA2_TX_DENIED' },
                                  ],
                                },
                                {
                                  prim: 'PUSH',
                                  args: [{ prim: 'nat' }, { int: '1' }],
                                },
                                { prim: 'DUP', args: [{ int: '5' }] },
                                { prim: 'COMPARE' },
                                { prim: 'LE' },
                                {
                                  prim: 'IF',
                                  args: [
                                    [{ prim: 'DROP' }],
                                    [{ prim: 'FAILWITH' }],
                                  ],
                                },
                                {
                                  prim: 'PUSH',
                                  args: [{ prim: 'nat' }, { int: '0' }],
                                },
                                { prim: 'DIG', args: [{ int: '3' }] },
                                { prim: 'COMPARE' },
                                { prim: 'EQ' },
                                {
                                  prim: 'IF',
                                  args: [
                                    [{ prim: 'DROP', args: [{ int: '3' }] }],
                                    [
                                      { prim: 'DUP', args: [{ int: '8' }] },
                                      {
                                        prim: 'PUSH',
                                        args: [{ prim: 'nat' }, { int: '1' }],
                                      },
                                      { prim: 'DUP', args: [{ int: '6' }] },
                                      { prim: 'DUP', args: [{ int: '5' }] },
                                      { prim: 'GET' },
                                      {
                                        prim: 'IF_NONE',
                                        args: [
                                          [
                                            {
                                              prim: 'PUSH',
                                              args: [
                                                { prim: 'nat' },
                                                { int: '0' },
                                              ],
                                            },
                                          ],
                                          [],
                                        ],
                                      },
                                      { prim: 'COMPARE' },
                                      { prim: 'EQ' },
                                      {
                                        prim: 'IF',
                                        args: [
                                          [{ prim: 'DROP' }],
                                          [{ prim: 'FAILWITH' }],
                                        ],
                                      },
                                      { prim: 'DUP', args: [{ int: '8' }] },
                                      { prim: 'DIG', args: [{ int: '3' }] },
                                      { prim: 'DUP', args: [{ int: '6' }] },
                                      { prim: 'COMPARE' },
                                      { prim: 'NEQ' },
                                      {
                                        prim: 'IF',
                                        args: [
                                          [{ prim: 'DROP' }],
                                          [{ prim: 'FAILWITH' }],
                                        ],
                                      },
                                      { prim: 'DUP', args: [{ int: '7' }] },
                                      {
                                        prim: 'PUSH',
                                        args: [{ prim: 'nat' }, { int: '0' }],
                                      },
                                      { prim: 'DUP', args: [{ int: '5' }] },
                                      { prim: 'DUP', args: [{ int: '4' }] },
                                      { prim: 'GET' },
                                      {
                                        prim: 'IF_NONE',
                                        args: [
                                          [
                                            {
                                              prim: 'PUSH',
                                              args: [
                                                { prim: 'nat' },
                                                { int: '0' },
                                              ],
                                            },
                                          ],
                                          [],
                                        ],
                                      },
                                      { prim: 'COMPARE' },
                                      { prim: 'EQ' },
                                      {
                                        prim: 'IF',
                                        args: [
                                          [{ prim: 'DROP' }],
                                          [{ prim: 'FAILWITH' }],
                                        ],
                                      },
                                      { prim: 'DUG', args: [{ int: '2' }] },
                                      { prim: 'NONE', args: [{ prim: 'nat' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'UPDATE' },
                                      {
                                        prim: 'PUSH',
                                        args: [{ prim: 'nat' }, { int: '1' }],
                                      },
                                      { prim: 'DIG', args: [{ int: '2' }] },
                                      { prim: 'SWAP' },
                                      { prim: 'SOME' },
                                      { prim: 'SWAP' },
                                      { prim: 'UPDATE' },
                                    ],
                                  ],
                                },
                              ],
                            ],
                          },
                          { prim: 'SWAP' },
                          { prim: 'DROP' },
                        ],
                      ],
                    },
                    { prim: 'SWAP' },
                    { prim: 'DIG', args: [{ int: '3' }] },
                    { prim: 'DIG', args: [{ int: '4' }] },
                    { prim: 'DROP', args: [{ int: '3' }] },
                    { prim: 'SWAP' },
                    { prim: 'DUP' },
                    { prim: 'DUG', args: [{ int: '2' }] },
                    { prim: 'CDR' },
                    { prim: 'DUP', args: [{ int: '3' }] },
                    { prim: 'CAR' },
                    { prim: 'CDR' },
                    { prim: 'CDR' },
                    { prim: 'DIG', args: [{ int: '2' }] },
                    { prim: 'PAIR' },
                    { prim: 'DIG', args: [{ int: '2' }] },
                    { prim: 'CAR' },
                    { prim: 'CAR' },
                    { prim: 'PAIR' },
                    { prim: 'PAIR' },
                    { prim: 'NIL', args: [{ prim: 'operation' }] },
                    { prim: 'PAIR' },
                  ],
                  [
                    { prim: 'DIG', args: [{ int: '2' }] },
                    { prim: 'DIG', args: [{ int: '3' }] },
                    { prim: 'DROP', args: [{ int: '2' }] },
                    { prim: 'SENDER' },
                    { prim: 'DUP', args: [{ int: '3' }] },
                    { prim: 'CDR' },
                    { prim: 'CAR' },
                    { prim: 'CAR' },
                    { prim: 'DIG', args: [{ int: '2' }] },
                    {
                      prim: 'ITER',
                      args: [
                        [
                          { prim: 'DUP' },
                          { prim: 'DUG', args: [{ int: '2' }] },
                          { prim: 'IF_LEFT', args: [[], []] },
                          {
                            prim: 'PUSH',
                            args: [
                              { prim: 'string' },
                              { string: 'FA2_NOT_OWNER' },
                            ],
                          },
                          { prim: 'SWAP' },
                          { prim: 'DUP' },
                          { prim: 'DUG', args: [{ int: '2' }] },
                          { prim: 'CAR' },
                          { prim: 'DUP', args: [{ int: '6' }] },
                          { prim: 'COMPARE' },
                          { prim: 'EQ' },
                          {
                            prim: 'IF',
                            args: [[{ prim: 'DROP' }], [{ prim: 'FAILWITH' }]],
                          },
                          { prim: 'DUP' },
                          { prim: 'GET', args: [{ int: '4' }] },
                          { prim: 'SWAP' },
                          { prim: 'DUP' },
                          { prim: 'DUG', args: [{ int: '2' }] },
                          { prim: 'GET', args: [{ int: '3' }] },
                          { prim: 'PAIR' },
                          { prim: 'SWAP' },
                          { prim: 'CAR' },
                          { prim: 'PAIR' },
                          { prim: 'DIG', args: [{ int: '2' }] },
                          {
                            prim: 'IF_LEFT',
                            args: [
                              [
                                { prim: 'DROP' },
                                { prim: 'SWAP' },
                                { prim: 'UNIT' },
                                { prim: 'DIG', args: [{ int: '2' }] },
                                { prim: 'SWAP' },
                                { prim: 'SOME' },
                                { prim: 'SWAP' },
                                { prim: 'UPDATE' },
                              ],
                              [
                                { prim: 'DROP' },
                                { prim: 'NONE', args: [{ prim: 'unit' }] },
                                { prim: 'SWAP' },
                                { prim: 'UPDATE' },
                              ],
                            ],
                          },
                        ],
                      ],
                    },
                    { prim: 'SWAP' },
                    { prim: 'DROP' },
                    { prim: 'SWAP' },
                    { prim: 'DUP' },
                    { prim: 'DUG', args: [{ int: '2' }] },
                    { prim: 'CDR' },
                    { prim: 'CDR' },
                    { prim: 'DUP', args: [{ int: '3' }] },
                    { prim: 'CDR' },
                    { prim: 'CAR' },
                    { prim: 'CDR' },
                    { prim: 'DIG', args: [{ int: '2' }] },
                    { prim: 'PAIR' },
                    { prim: 'PAIR' },
                    { prim: 'SWAP' },
                    { prim: 'CAR' },
                    { prim: 'PAIR' },
                    { prim: 'NIL', args: [{ prim: 'operation' }] },
                    { prim: 'PAIR' },
                  ],
                ],
              },
            ],
          ],
        },
      ],
    ],
  },
  {
    prim: 'view',
    args: [
      { string: 'get_balance' },
      {
        prim: 'pair',
        args: [
          { prim: 'address', annots: ['%owner'] },
          { prim: 'nat', annots: ['%token_id'] },
        ],
      },
      { prim: 'nat' },
      [
        { prim: 'UNPAIR' },
        { prim: 'SWAP' },
        { prim: 'CAR' },
        { prim: 'CDR' },
        { prim: 'CAR' },
        { prim: 'SWAP' },
        { prim: 'DUP' },
        { prim: 'DUG', args: [{ int: '2' }] },
        { prim: 'CDR' },
        { prim: 'DIG', args: [{ int: '2' }] },
        { prim: 'CAR' },
        { prim: 'PAIR' },
        { prim: 'GET' },
        {
          prim: 'IF_NONE',
          args: [[{ prim: 'PUSH', args: [{ prim: 'nat' }, { int: '0' }] }], []],
        },
      ],
    ],
  },
  {
    prim: 'view',
    args: [
      { string: 'total_supply' },
      { prim: 'nat' },
      { prim: 'nat' },
      [
        { prim: 'UNPAIR' },
        { prim: 'SWAP' },
        { prim: 'CDR' },
        { prim: 'CDR' },
        { prim: 'SWAP' },
        { prim: 'GET' },
        {
          prim: 'IF_NONE',
          args: [
            [
              {
                prim: 'PUSH',
                args: [{ prim: 'string' }, { string: 'FA2_TOKEN_UNDEFINED' }],
              },
              { prim: 'FAILWITH' },
            ],
            [],
          ],
        },
      ],
    ],
  },
  {
    prim: 'view',
    args: [
      { string: 'all_tokens' },
      { prim: 'unit' },
      { prim: 'list', args: [{ prim: 'nat' }] },
      [{ prim: 'CDR' }, { prim: 'CAR' }, { prim: 'CAR' }, { prim: 'CDR' }],
    ],
  },
  {
    prim: 'view',
    args: [
      { string: 'is_operator' },
      {
        prim: 'pair',
        args: [
          { prim: 'address', annots: ['%owner'] },
          {
            prim: 'pair',
            args: [
              { prim: 'address', annots: ['%operator'] },
              { prim: 'nat', annots: ['%token_id'] },
            ],
          },
        ],
      },
      { prim: 'bool' },
      [
        { prim: 'UNPAIR' },
        { prim: 'SWAP' },
        { prim: 'CDR' },
        { prim: 'CAR' },
        { prim: 'CAR' },
        { prim: 'SWAP' },
        { prim: 'DUP' },
        { prim: 'DUG', args: [{ int: '2' }] },
        { prim: 'GET', args: [{ int: '4' }] },
        { prim: 'DUP', args: [{ int: '3' }] },
        { prim: 'GET', args: [{ int: '3' }] },
        { prim: 'PAIR' },
        { prim: 'DIG', args: [{ int: '2' }] },
        { prim: 'CAR' },
        { prim: 'PAIR' },
        { prim: 'GET' },
        {
          prim: 'IF_NONE',
          args: [
            [{ prim: 'PUSH', args: [{ prim: 'bool' }, { prim: 'False' }] }],
            [
              { prim: 'DROP' },
              { prim: 'PUSH', args: [{ prim: 'bool' }, { prim: 'True' }] },
            ],
          ],
        },
      ],
    ],
  },
  {
    prim: 'view',
    args: [
      { string: 'token_metadata' },
      { prim: 'nat' },
      {
        prim: 'pair',
        args: [
          { prim: 'nat', annots: ['%token_id'] },
          {
            prim: 'map',
            args: [{ prim: 'string' }, { prim: 'bytes' }],
            annots: ['%token_info'],
          },
        ],
      },
      [
        { prim: 'UNPAIR' },
        { prim: 'SWAP' },
        { prim: 'CDR' },
        { prim: 'CAR' },
        { prim: 'CDR' },
        { prim: 'SWAP' },
        { prim: 'GET' },
        {
          prim: 'IF_NONE',
          args: [
            [
              {
                prim: 'PUSH',
                args: [{ prim: 'string' }, { string: 'FA2_TOKEN_UNDEFINED' }],
              },
              { prim: 'FAILWITH' },
            ],
            [],
          ],
        },
      ],
    ],
  },
];

export default smartContract;
