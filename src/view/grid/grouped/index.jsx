import React from 'react'
import ReExt from '@gusmano/reext'
import i18next from 'i18next'

import './GridController'

export function GridGrouped() {
  return (
    <ReExt
      xtype="treegroupedgrid"
      config={{
        controller: 'groupedgridcontroller',
        viewModel: true,
        store: {
          model: 'ReExtExample.model.Employee',
          autoLoad: true,
          sorters: [
            {
              property: 'joinDate',
              direction: 'DESC',
            },
          ],
          groupers: [
            {
              property: 'joinDate',
              // you can provide a formatter that is used to create groups
              formatter: 'date("Y")',
            },
            // {
            //   property: 'countryName'
            // },
            {
              property: 'department',
            },
          ],
          pageSize: 0,
          proxy: {
            type: 'ajax',
            limitParam: null,
            url: '/sencha-examples/api/employee',
          },
        },
        width: '100vw',
        height: 'calc(100vh - 96px)',
        startCollapsed: false,
        summaryPosition: 'docked',
        groupSummaryPosition: 'top',
        groupHeaderTpl: '{name} ({group.length})',
        rowLines: true,
        columnLines: true,
        itemConfig: {
          viewModel: {
            formulas: {
              isGroupRecord: function (get) {
                if (get('record').get('employeeNo') === 0) {
                }

                return get('record').isGroup === true || get('record').isSummary === true
              },
            },
          },
        },
        plugins: {
          groupingpanel: true,
          gridsummaries: true,
          gridviewoptions: true,
          grideditable: true,
          gridfilters: true,
        },
        items: [
          {
            xtype: 'toolbar',
            docked: 'top',
            items: [
              {
                text: i18next.t('FILTERS'),
                iconCls: 'x-fa fa-filter',
                xtype: 'button',
                reference: 'ShowFilters',
                menu: {
                  listeners: {
                    beforeShow: 'onShowFilters',
                    beforeHide: 'onHideFilters',
                  },
                  items: [
                    {
                      text: i18next.t('ALL_FILTERS'),
                      reference: 'allFilter',
                      checked: true,
                      checkHandler: 'handleAllFilters',
                    },
                    '-',
                  ],
                },
              },
            ],
          },
        ],
        columns: [
          {
            menuDisabled: true,
            hideable: false,
            sortable: false,
            groupable: false,
            ignore: true,
            align: 'center',
            text: '<span class="x-fa fa-image"></span>',
            width: 58,
            cell: {
              xtype: 'widgetcell',
              encodeHtml: false,
              widget: {
                xtype: 'container',
                layout: 'center',
                items: [
                  {
                    xtype: 'avatar',
                    bind: {
                      fullName: '{record.fullName}',
                    },
                    height: 30, // Set appropriate height
                    width: 30, // Set appropriate width
                  },
                ],
              },
            },
          },
          {
            text: i18next.t('NAME'),
            dataIndex: 'fullName',
            filterType: 'string',
            minWidth: 150,
            flex: 1,
            // sorter: {
            //   sorterFn: 'nameSorter' // set controller
            // },
            groupable: true,
          },
          {
            text: i18next.t('AGE'),
            groupable: true,
            ignore: true,
            editable: true,
            editor: {
              xtype: 'spinnerfield',
            },
            summary: 'average',
            formatter: 'number("0")',
            dataIndex: 'age',
            filterType: 'number',
            width: 80,
            align: 'center',
            cell: {
              encodeHtml: false,
            },
            renderer: 'ageRenderer',
          },
          {
            text: i18next.t('COUNTRY'),
            width: 200,
            dataIndex: 'countryName',
            groupable: true,
            filterType: 'string',
            cell: {
              encodeHtml: false,
            },
            renderer: 'countryRenderer',
          },
          {
            text: i18next.t('DEPARTMENT'),
            dataIndex: 'department',
            groupable: true,
            filterType: 'string',
            flex: 1,
          },
          {
            xtype: 'datecolumn',
            text: i18next.t('JOIN_DATE'),
            // you can provide a formatter that is used to create groups
            groupFormatter: 'date("Y")',
            dataIndex: 'joinDate',
            filterType: 'date',
            groupable: true,
            width: 115,
          },
          {
            text: i18next.t('EMAIL'),
            editable: true,
            editor: {
              xtype: 'emailfield',
            },
            dataIndex: 'email',
            groupable: false,
            filterType: 'string',
            flex: 1,
          },
          {
            text: i18next.t('SALARY'),
            cell: {
              encodeHtml: false,
            },
            summary: 'sum',
            editable: true,
            editor: {
              xtype: 'numberfield',
            },
            dataIndex: 'salary',
            filterType: 'number',
            formatter: 'currency',
            width: 150,
            align: 'right',
          },
        ],
      }}
      rid="1717560282773"
    />
  )
}
