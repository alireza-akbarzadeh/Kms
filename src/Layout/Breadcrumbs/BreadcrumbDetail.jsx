import React from "react";
import {
    GroupsSharp,
    Article,
    HolidayVillage,
    QuestionMarkSharp,
    Person,
    Info,
    SupportAgent,
    FindInPage,
    Cloud,
    Gavel,
    Settings,
    DateRange,
    Workspaces,
    Archive,
    Tag,
    Details,
    Add,
    ListAltOutlined,
    BookmarkAdded, DraftsOutlined, DocumentScannerOutlined, Notifications
} from '@mui/icons-material';


const BreadcrumbDetail = (path) => {
    let id = null
    if (path.split('/').length === 2) {
        id = '/' + path.split('/')[1]
    }else if(path.split('/').length === 3){
        id = '/' + path.split('/')[2]
    }

    // const {t} = useTranslation();
    const data = {
        teams: [
            {
                // title: t('teams'),
                title: 'تیم ها',
                link: '/teams',
                icon: <GroupsSharp sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            }
        ],
        notification: [
            {
                // title: t('teams'),
                title: 'پیام ها',
                link: '/notification',
                icon: <Notifications sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            }
        ],
        users: [
            {
                title: 'کاربران',
                link: '/users',
                icon: <GroupsSharp sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            }
        ],
        document: [
            {
                title: 'منابع',
                link: '/document',
                icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            },
        ],
        archives: [
            {
                title: 'منابع',
                link: '/document',
                icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: true
            },  {
                title: 'آرشیو',
                link: '/archives',
                icon: <Archive sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            },
        ],
        vacation: [
            {
                title: 'مرخصی',
                link: '/vacation',
                icon: <HolidayVillage sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            }
        ],
        projects: [
            {
                title: 'پروژه ها',
                link: '/projects',
                icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            }
        ],
        tickets: [
            {
                title: 'تیکت ها',
                link: '/tickets',
                icon: <SupportAgent sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            }
        ],
        'content-placement': [
            {
                title: 'محتوا گزاری',
                link: '/content-placement',
                icon: <FindInPage sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            }
        ],
        drive: [
            {
                title: 'درایو',
                link: '/drive',
                icon: <Cloud sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            }
        ],
        myDrive: [
            {
                title: 'درایو',
                link: '/drive',
                icon: <Cloud sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: true
            },
            {
                title: 'درایو های من',
                link: '/myDrive',
                icon: <Person sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            }
        ],
        rules: [
            {
                title: 'قوانین',
                link: '/rules',
                icon: <Gavel sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            }
        ],
        config: [
            {
                title: 'تنظیمات',
                link: '/config',
                icon: <Settings sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            }
        ],
        'config-workspace': [
            {
                title: 'تنظیمات',
                link: '/config',
                icon: <Settings sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: true
            },
            {
                title: 'محل کار',
                link: '/config-workspace',
                icon: <Workspaces sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            }
        ],
        'config-leaves': [
            {
                title: 'تنظیمات',
                link: '/config',
                icon: <Settings sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: true
            },
            {
                title: 'ساعات کاری',
                link: '/config-leaves',
                icon: <DateRange sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            }
        ],
        'user-panel': [
            {
                title: 'پروفایل',
                link: '/user-panel',
                icon: <Person sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            }
        ],
        'my-vacation': [
            {
                title: 'پروفایل',
                link: '/user-panel',
                icon: <Person sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: true
            },
            {
                title: 'مرخصی',
                link: '/my-vacation',
                icon: <DateRange sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            }
        ],
        'my-studytime': [
            {
                title: 'پروفایل',
                link: '/user-panel',
                icon: <Person sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: true
            },
            {
                title: 'زمان مطالعه',
                link: '/my-studytime',
                icon: <DateRange sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            }
        ],
        'document/tags': [
            {
                title: 'منابع',
                link: '/document',
                icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: true
            },
            {
                title: 'برچسب ها',
                link: '/document/tags',
                icon: <Tag sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            },
        ],
        'document/store-article': [
            {
                title: 'منابع',
                link: '/document',
                icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: true
            },
            {
                title: 'ساخت مقاله',
                link: '/document/store-article',
                icon: <Add sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            },
        ],
        'document/store-wiki': [
            {
                title: 'منابع',
                link: '/document',
                icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: true
            },
            {
                title: 'ساخت ویکی',
                link: '/document/store-wiki',
                icon: <Add sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            },
        ],
        'document/articles': [
            {
                title: 'منابع',
                link: '/document',
                icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: true
            },
            {
                title: 'مقالات',
                link: '/document/articles',
                icon: <ListAltOutlined sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            },
        ],
        'document/wikis': [
            {
                title: 'منابع',
                link: '/document',
                icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: true
            },
            {
                title: 'ویکی',
                link: '/document/wikis',
                icon: <ListAltOutlined sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            },
        ],
        'document/bookmarks': [
            {
                title: 'منابع',
                link: '/document',
                icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: true
            },
            {
                title: 'ذخیره شده‌ها',
                link: '/document/bookmarks',
                icon: <BookmarkAdded sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            },
        ],
        'document/drafts': [
            {
                title: 'منابع',
                link: '/document',
                icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: true
            },
            {
                title: 'پیش نویس',
                link: '/document/drafts',
                icon: <DraftsOutlined sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            },
        ],
        'document/mine': [
            {
                title: 'منابع',
                link: '/document',
                icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: true
            },
            {
                title: 'منابع من',
                link: '/document/mine',
                icon: <Person sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            },
        ],
        'document/myKnowledge': [
            {
                title: 'منابع',
                link: '/document',
                icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: true
            },
            {
                title: 'درخت دانشی',
                link: '/document/myKnowledge',
                icon: <Person sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            },
        ],
        'document/knowledge/update': [
            {
                title: 'منابع',
                link: '/document',
                icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: true
            },
            {
                title: 'درخت دانشی',
                link: '/document/knowledge/update',
                icon: <Person sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            },
        ],
        'document/update': [
            {
                title: 'منابع',
                link: '/document',
                icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: true
            },
            {
                title: 'بروزرسانی',
                link: '/document/update',
                icon: <Person sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            },
        ],
        'document/templates': [
            {
                title: 'منابع',
                link: '/document',
                icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: true
            },
            {
                title: 'قالب مقاله',
                link: '/document/templates',
                icon: <DocumentScannerOutlined sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            },
        ]
    }


    data['vacations' + id] = [
        {
            title: 'مرخصی',
            link: '/vacation',
            icon: <HolidayVillage sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: true
        },
        {
            title: 'کاربر',
            link: '/vacations' + id,
            icon: <Person sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: false
        }
    ]

    data['project' + id] = [
        {
            title: 'پروژه ها',
            link: '/projects',
            icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: true
        },
        {
            title: 'جزییات',
            link: '/project' + id,
            icon: <Info sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: false
        }
    ]
    data['team' + id] = [
        {
            title: 'تیم ها',
            link: '/teams',
            icon: <GroupsSharp sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: true
        },
        {
            title: 'جزییات',
            link: '/team' + id,
            icon: <Info sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: false
        }
    ]
    data['ticket' + id] = [
        {
            title: 'تیکت ها',
            link: '/tickets',
            icon: <SupportAgent sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: true
        },
        {
            title: 'جزییات',
            link: '/ticket' + id,
            icon: <Info sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: false
        }
    ]
    data['archive-tasks' + id] = [
        {
            title: 'پروژه ها',
            link: '/projects',
            icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: true
        },
        {
            title: 'جزییات',
            link: '/project' + id,
            icon: <Info sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: true
        },
        {
            title: 'آرشیو',
            link: '/archive-tasks' + id,
            icon: <Archive sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: false
        }
    ]

    data['document/article' + id] = [
        {
            title: 'منابع',
            link: '/document',
            icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: true
        },
        {
            title: 'جزئیات',
            link: '/document/article' + id,
            icon: <Details sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: false
        }
    ]

    data['document/wiki' + id] = [
        {
            title: 'منابع',
            link: '/document',
            icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: true
        },
        {
            title: 'جزئیات',
            link: '/document/wiki' + id,
            icon: <Details sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: false
        }
    ]
    data['document/contributes' + id] = [
        {
            title: 'منابع',
            link: '/document',
            icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: true
        },
        {
            title: 'جزئیات',
            link: '/document/wiki' + id,
            icon: <Details sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: true
        },
        {
            title: 'مشارکت ها',
            link: '/document/contributes' + id,
            icon: <Person sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: false
        },

    ]


    data['document/comments' + id] = [
        {
            title: 'منابع',
            link: '/document',
            icon: <Article sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: true
        },
        {
            title: 'نظرات',
            link: '/document/comments' + id,
            icon: <Details sx={{margin: '0 5px'}} fontSize='inherit'/>,
            active: false
        }
    ]


    if (data[path] === undefined && path !== 'dashboard') {
        return [
            {
                title: '_',
                link: '_',
                icon: <QuestionMarkSharp sx={{margin: '0 5px'}} fontSize='inherit'/>,
                active: false
            }
        ]
    } else {
        return data[path]
    }
}
export default BreadcrumbDetail;